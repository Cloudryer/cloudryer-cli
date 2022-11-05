const {printMachines, printSummary} = require('./printMachines');
const {getEc2Instances} = require('../vendors/aws/ec2Client');
const {getAverageResourcesCostPerHour} = require('../vendors/aws/costClient');
const {getInstancesMetrics} = require('../vendors/aws/metricsClient');
const {lookUpInstancesEvents} = require('../vendors/aws/cloudTrailClient');
const {getAwsRegionCodes} = require('../vendors/aws/utils');
const {timeSeriesScalarOperation} = require('../utils/timeSeriesUtils');
const {Machine, States, Waste, Metrics, Cost} = require('./metadata');

const MILLIS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Print the list of machines and returns a list of machines with their utilization and waste
 *
 * @param hideUtilization
 * @param calculateWaste
 * @param evaluationPeriod
 * @returns {Promise<void>}
 */
const listMachines = async function ({hideUtilization, calculateWaste, evaluationPeriod}) {

  let enrichedMachinesData = await fetchAndEnrichMachineData({
    fetchUtilization: !hideUtilization,
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
 * Calculate a utilization metric based on the cpu, disk and network metrics
 * @param instancesMetrics  {cpu: [values], disk: [values], network: [values], timestamps: [timestamps]}
 * @returns [[timestamp, utilization]]
 */
function calculateUtilization(metrics) {
  const timeSeries = {};

  //TODO: normalize the metrics to the same scale

  Object.keys(metrics).forEach(metricKey => {
    timeSeries[metricKey] = metrics[metricKey].values.map((value, index) => [metrics[metricKey].timestamps[index], value]);
  });

  return timeSeriesScalarOperation(timeSeries, (perTimestampValues) => {

    return (perTimestampValues[Metrics.CPU] + perTimestampValues[Metrics.DiskReadWriteOps] + perTimestampValues[Metrics.NetworkPacketsInOut]) / 3;
  });
}

/**
 * Fetch machines data and enrich it with utilazation information and pricing data
 * @param fetchUtilization
 * @param calculateWaste
 * @param evalPeriod
 * @returns {Promise<[{
                        instanceId,
                        state,
                        machineType,
                        cpuPct,
                        diskIOsec,
                        networkMBsec,
                        wastePerPeriod,
                        timePctNotUtilized,
                        evalPeriod
                     }]>}
 */


// const listMachines = async function ({hideUtilization, calculateWaste, evaluationPeriod}) {
//
//   let perInstanceStatesTimeSeries ; //fetch from cloudtrail using evaluation period
//   let instncesMetrics ; //fetch from cloudwatch using evaluation period
//   let instancesCostPerHour ; //fetch from cost explorer api using evaluation period
//   let instancesUtilization ; //calculate from instancesMetrics
//
//   // esitmate perhour cost if missing
//   // estimate states if missing
//
//
//   let runningWastePerInstancePerHour = calculateRunningWaste(instancesUtilization,instancesCostPerHour);
//   let stoppedWastePerInstancePerHour = calculateStoppedWaste(perInstanceStatesTimeSeries,instancesCostPerHour);
//
//
// }


const fetchAndEnrichMachineData = async function ({fetchUtilization, calculateWaste, evalPeriodDays}) {


  let instancesAverageCostPerHour = await getAverageResourcesCostPerHour();

  let instances = await getEc2Instances(getAwsRegionCodes()); // [{instanceId, type,startTime,endTime, other static properties}]
  const perRegionInstances = {};
  instances.forEach(instance => {
    if (!perRegionInstances[instance.region]) {
      perRegionInstances[instance.region] = [];
    }
    perRegionInstances[instance.region].push(instance.instanceId);
  });

  const instancesEvents = await lookUpInstancesEvents(getAwsRegionCodes()); // {instanceId:[{event1},{event2}]}

  const instancesUpTime = {}; // {instanceId:[{startTime,endTime}]}
  const instancesCreator = {}; // {instanceId:user}
  const instanceStateStats = {}; // {instanceId:{'runningHr':number,'stoppedHr':number,'lifetimeHr':number}}
  Object.keys(instancesEvents).forEach(instanceId => {
    let events = instancesEvents[instanceId];
    instancesCreator[instanceId] = null;
    instancesUpTime[instanceId] = [];
    instanceStateStats[instanceId] = {};
    events.sort((event1, event2) => {
      return event1.date - event2.date;
    }).forEach(event => {
      if (event.name === 'RunInstances') {
        instancesCreator[instanceId] = event.username;
        instancesUpTime[instanceId].push({startTime: event.date});
      } else if (event.name === 'StartInstances') {
        instancesUpTime[instanceId].push({startTime: event.date});
      } else if (event.name === 'TerminateInstances' || event.name === 'StopInstances') {
        if (instancesUpTime[instanceId].length - 1 >= 0) {
          instancesUpTime[instanceId][instancesUpTime[instanceId].length - 1].endTime = event.date;
        } else {
          instancesUpTime[instanceId].push({endTime: event.date});
        }

      }
    });
  });
  console.log(instancesUpTime);
  console.log(instancesCreator);

  const latestMetricsValuesPerInstance = {};
  const instancesUtilization = {}; // {instanceId:[{timestamp,utilization}]}
  let currentDate = new Date();
  let dateMinusEvalPeriod = new Date(currentDate.getTime() - evalPeriodDays * MILLIS_PER_DAY);
  if (fetchUtilization) {
    const perInstanceMetrics = await getInstancesMetrics({ // {instanceId:[{metric1},{metric2}]}
      perRegionInstances,
      startDate: dateMinusEvalPeriod,
      endDate: currentDate
    });


    Object.keys(perInstanceMetrics).forEach((instanceId) => {
      const metrics = perInstanceMetrics[instanceId];

      latestMetricsValuesPerInstance[instanceId] = {
        [Metrics.CPU]: metrics[Metrics.CPU].values[metrics[Metrics.CPU].length - 1],
        [Metrics.DiskReadWriteOps]: metrics[Metrics.DiskReadOps].values[metrics[Metrics.DiskReadWriteOps].length - 1],
        network: networkValues[networkValues.length - 1],
      };
      instancesUtilization[instanceId] = calculateUtilization();
    });
  }


  // let machinesIdleTimePerPeriod = calculateIdleTime(machinesMetrics,evalPeriod); //{instanceId : {timeInHrs,pct}}

  // let machinesTotalIdleTime = calculateIdleTime(machinesMetrics,-1); //{instanceId : {timeInHrs,pct}}

  // let machinesWastePerPeriod = calulateWaste (pricingData,machinesIdleTimePerPeriodPct) // {instanceId : {amount,pct}}

  // let machinesTotalWastePerPeriod = calulateWaste (pricingData,machinesTotalIdleTimePct) //{instanceId : {amount,pct}}


  // let data = require('../testData/fakedMachineData')({fetchUtilization, calculateWaste, evalPeriod});
  // return data;
  let enrichedInstances = instances.map(instance => {
    return {
      [Machine.InstanceID]: instance.instanceId,
      [Machine.State]: instance.state,
      [Machine.MachineType]: instance.type,
      [Machine.CreationDate]: instance.startTime,
      [Machine.Creator]: instancesCreator[instance.instanceId] ? instancesCreator[instance.instanceId] : 'unknown',
      [Machine.UpTime]: instancesUpTime[instance.instanceId],
      [Metrics.CPU]: latestMetricsValuesPerInstance[instance.instanceId] ? latestMetricsValuesPerInstance[instance.instanceId].cpu : [],
      [Metrics.Disk]: latestMetricsValuesPerInstance[instance.instanceId] ? latestMetricsValuesPerInstance[instance.instanceId].disk : [],
      [Metrics.Network]: latestMetricsValuesPerInstance[instance.instanceId] ? latestMetricsValuesPerInstance[instance.instanceId].network : [],
      [Waste.TotalWaste]: 0,
      [Waste.IdlePct]: 0,
      [Cost.TotalCost]: 0,

    }
  });

  return enrichedInstances;

}

module.exports = listMachines;
