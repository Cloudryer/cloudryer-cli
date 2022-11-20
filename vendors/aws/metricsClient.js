import {CloudWatchClient, GetMetricDataCommand} from '@aws-sdk/client-cloudwatch';
import {Metrics} from '../../models/metadata.js';
import TimeSeries from '../../models/timeSeries.js';
import {printUpdate} from "../../utils/printingUtils.js";

const METRIC_PERIOD_SEC = 3600;

const MetricsLabelsMappping = {
  "CPUUtilization": Metrics.CPU,
  "MetadataNoToken": Metrics.UpTime,
  "NetworkPacketsIn": Metrics.NetworkPacketsIn,
  "NetworkPacketsOut": Metrics.NetworkPacketsOut,
  "DiskReadOps": Metrics.DiskReadOps,
  "DiskWriteOps": Metrics.DiskWriteOps
};

const createMetricPayload = function (instanceId, metricName) {
  return {
    Id: `${instanceId.replace('-', '_')}_${metricName}`,
    MetricStat: {
      Metric: {
        Dimensions: [
          {
            Name: "InstanceId",
            Value: instanceId
          }
        ],
        MetricName: metricName,
        Namespace: "AWS/EC2"
      },
      Period: METRIC_PERIOD_SEC,
      Stat: "Maximum"
    },
    ReturnData: true
  }
};


/**
 * Returns a map of instanceId and their respective metrics as TimeSeries objects
 * @param perRegionInstances
 * @param startDate
 * @param endDate
 * @returns {Promise<{}>}
 */
const getInstancesMetrics = async function ({perRegionInstances, startDate, endDate}) {
  const instancesMetrics = {};
  for (let region of Object.keys(perRegionInstances)) {
    const client = new CloudWatchClient({region: region});
    const params = {
      StartTime: startDate,
      EndTime: endDate,
      MetricDataQueries: []
    };

    perRegionInstances[region].forEach((instanceId) => {
      params.MetricDataQueries.push(createMetricPayload(instanceId, 'CPUUtilization'));
      params.MetricDataQueries.push(createMetricPayload(instanceId, 'MetadataNoToken'));
      params.MetricDataQueries.push(createMetricPayload(instanceId, 'NetworkPacketsIn'));
      params.MetricDataQueries.push(createMetricPayload(instanceId, 'NetworkPacketsOut'));
      params.MetricDataQueries.push(createMetricPayload(instanceId, 'DiskReadOps'));
      params.MetricDataQueries.push(createMetricPayload(instanceId, 'DiskWriteOps'));
    });

    printUpdate('Fetching instances metrics from CloudWatch API for region ' + region);
    const data = await client.send(new GetMetricDataCommand(params));

    data.MetricDataResults.forEach((metricDataResult) => {
      let idParts = metricDataResult.Id.split('_');
      const instanceId = `i-${idParts[1]}`;
      if (!instancesMetrics[instanceId]) {
        instancesMetrics[instanceId] = {};
      }
      const metricName = MetricsLabelsMappping[metricDataResult.Label.split(' ')[1]];
      const timestamps = metricDataResult.Timestamps.map((timestamp) => new Date(timestamp).toISOString());
      let values = metricDataResult.Values;
      if (metricName === Metrics.UpTime) {
        values = values.map((value) => value === 0 ? 1 : 0);
      }
      instancesMetrics[instanceId][metricName] = new TimeSeries(metricName, values, timestamps);
    });
  }

  return instancesMetrics;
};

export {
  getInstancesMetrics
};