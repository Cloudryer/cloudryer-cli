import {printMachines, printSummary} from './printMachines.js';
import * as InstancesClient from '../vendors/aws/ec2Client.js';
import * as MetricsClient from '../vendors/aws/metricsClient.js';
import * as CloudTrailClient from '../vendors/aws/cloudTrailClient.js';
import {getAwsRegionCodes} from '../vendors/aws/utils.js';
import {multiTimeSeriesScalarOperation, sumTwoTimeSeries} from '../utils/timeSeriesUtils.js';
import {Machine, Waste, Metrics, Cost, Resource, Lifecycle, AuditEvent} from '../models/metadata.js';
import {getInstanceCostPerHour} from '../vendors/aws/pricingCatalog.js';
import {printUpdate} from '../utils/printingUtils.js';

const MILLIS_PER_DAY = 24 * 60 * 60 * 1000;

const utilizationThresholds = {
  [Metrics.CPU]: 10,
  [Metrics.DiskReadWriteOps]: 100,
  [Metrics.NetworkPacketsInOut]: 2000
}


/**
 * Print the list of machines and returns a list of machines with their utilization and waste
 * @param hideUtilization
 * @param calculateWaste
 * @param evaluationPeriod
 * @returns {Promise<(*&{"[Resource.CreationDate]": *, "[Resource.Creator]": (*|string), "[Waste.EvalPeriod]"})[]>}
 */
const listMachines = async function ({hideUtilization, calculateWaste, evaluationPeriod}) {

  const enrichedMachinesData = await fetchAndEnrichMachineData({
    fetchUtilization: calculateWaste || !hideUtilization,
    calculateWaste,
    evalPeriodDays: evaluationPeriod
  });
  printMachines(enrichedMachinesData, {hideUtilization, calculateWaste, evaluationPeriod});
  if (calculateWaste) {
    printSummary(enrichedMachinesData, {hideUtilization, calculateWaste, evaluationPeriod});
  }

  return enrichedMachinesData;
};


/**
 * Calculate a utilization time series for given instance's cpu,disk and network metrics
 * @param metrics - array of cpu,disk and network time series
 * @returns {TimeSeries} - utilization time series
 */
function calculateUtilization(metrics) {

  const utilizationTimeSeries = multiTimeSeriesScalarOperation(metrics, (perTimestampValues) => {
    //TODO: interface is not clear. it's not clear which metric is used for the timestamps
    let networkActivity = perTimestampValues[Metrics.NetworkPacketsInOut] > utilizationThresholds[Metrics.NetworkPacketsInOut];
    let diskActivity = perTimestampValues[Metrics.DiskReadWriteOps] > utilizationThresholds[Metrics.DiskReadWriteOps];
    let cpuActivity = perTimestampValues[Metrics.CPU] > utilizationThresholds[Metrics.CPU];
    return ((networkActivity || diskActivity) && cpuActivity) ? 1 : 0;
  });
  utilizationTimeSeries.setName(Metrics.Utilization);
  return utilizationTimeSeries;
}

async function fetchMetricsAndAnalyzeUtilization(evalPeriodDays, fetchUtilization, perRegionInstances) {
  const instancesUtilization = {};
  let currentDate = new Date();
  let endDate = new Date(currentDate);
  endDate.setMinutes(0);
  endDate.setSeconds(0);
  endDate.setMilliseconds(0);

  let dateMinusEvalPeriod = new Date(endDate - evalPeriodDays * MILLIS_PER_DAY);
  let perInstanceMetrics;
  if (fetchUtilization) {
    perInstanceMetrics = await MetricsClient.getInstancesMetrics({ // {instanceId:[{metric1},{metric2}]}
      perRegionInstances,
      startDate: dateMinusEvalPeriod,
      endDate: endDate
    });

    Object.keys(perInstanceMetrics).forEach((instanceId) => {
      const metrics = perInstanceMetrics[instanceId];
      metrics[Metrics.DiskReadWriteOps] = sumTwoTimeSeries(metrics[Metrics.DiskReadOps], metrics[Metrics.DiskWriteOps], Metrics.DiskReadWriteOps);
      metrics[Metrics.NetworkPacketsInOut] = sumTwoTimeSeries(metrics[Metrics.NetworkPacketsIn], metrics[Metrics.NetworkPacketsOut], Metrics.NetworkPacketsInOut);
      instancesUtilization[instanceId] = calculateUtilization([metrics[Metrics.CPU], metrics[Metrics.DiskReadWriteOps], metrics[Metrics.NetworkPacketsInOut]]);
    });
  }
  return {perInstanceMetrics, instancesUtilization};
}


async function fetchAndEnrichMachineData({fetchUtilization, calculateWaste, evalPeriodDays}) {

  const currentDate = new Date();
  let instances = await InstancesClient.getEc2Instances(getAwsRegionCodes());
  const {instancesInfo, instancesEvents} = await CloudTrailClient.lookUpInstancesEvents(getAwsRegionCodes()); // {instanceId:[{event1},{event2}]}
  Object.keys(instancesInfo).forEach(instanceId => {
    let instance = instances[instanceId];
    if (instance) {
      instance[Resource.Creator] = instancesInfo[instanceId][Resource.Creator];
    } else {
      instances[instanceId] = instancesInfo[instanceId];
    }
  });

  const perRegionInstances = {};
  Object.values(instances).forEach(instance => {
    if (!perRegionInstances[instance[Resource.Region]]) {
      perRegionInstances[instance[Resource.Region]] = [];
    }
    perRegionInstances[instance[Resource.Region]].push(instance[Machine.InstanceID]);
  });

  const {
    perInstanceMetrics,
    instancesUtilization
  } = await fetchMetricsAndAnalyzeUtilization(evalPeriodDays, fetchUtilization, perRegionInstances);
  printUpdate();

  return Object.values(instances).map(instance => {
    let instanceId = instance[Machine.InstanceID];
    let enrichedInstance = {
      ...instance,
      [Waste.EvalPeriod]: evalPeriodDays,
    }
    if (instancesEvents[instanceId] && instancesEvents[instanceId].length > 0) {
      enrichedInstance[Lifecycle.LastStateChangeDate]= instancesEvents[instanceId][0][AuditEvent.Date];
    }

    if (!instance[Resource.Creator]) {
      enrichedInstance[Resource.Creator] = 'unknown';
    }
    if (fetchUtilization) {
      enrichedInstance[Metrics.CPU] = perInstanceMetrics[instanceId][Metrics.CPU].getLatestValue();
      enrichedInstance[Metrics.DiskReadWriteOps] = perInstanceMetrics[instanceId][Metrics.DiskReadWriteOps].getLatestValue();
      enrichedInstance[Metrics.NetworkPacketsInOut] = perInstanceMetrics[instanceId][Metrics.NetworkPacketsInOut].getLatestValue();
      enrichedInstance[Lifecycle.LastUtilizationDate] = instancesUtilization[instanceId].lastTimestamp((value) => value > 0);

      let totalUpTime = perInstanceMetrics[instanceId][Metrics.UpTime].getSum();
      let totalUtilizedTime = instancesUtilization[instanceId].getSum();
      enrichedInstance[Metrics.UpTime] = totalUpTime;
      let costPerHour = getInstanceCostPerHour({
        region: instance[Resource.Region],
        instanceType: instance[Machine.InstanceType],
        operatingSystem: instance[Machine.OperatingSystem],
      });
      enrichedInstance[Cost.TotalCost] = totalUpTime * costPerHour;
      if (calculateWaste) {
        enrichedInstance[Waste.TotalWaste] = (totalUpTime - totalUtilizedTime) * costPerHour;
        enrichedInstance[Waste.IdlePct] = Math.floor((1 - totalUtilizedTime / totalUpTime) * 10000) / 100 + '%';
      }
    }
    enrichedInstance[Resource.CreationDate] = new Date(instance[Resource.CreationDate]);
    return enrichedInstance;
  });

}

export {listMachines};
