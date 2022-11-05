const {CloudWatchClient, GetMetricDataCommand} = require("@aws-sdk/client-cloudwatch");
const {Metrics} = require('../../machines/metadata')

const METRIC_PERIOD_SEC = 300;

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
}

const getInstancesMetrics = async function ({perRegionInstances,startDate, endDate}) {
  const instancesMetrics = {};
  for(let region of Object.keys(perRegionInstances)) {
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


    const data = await client.send(new GetMetricDataCommand(params));
    //console.log(data);

    data.MetricDataResults.forEach((metricDataResult) => {
      const instanceId = metricDataResult.Id.split('_')[0];
      if (!instancesMetrics[instanceId]) {
        instancesMetrics[instanceId] = {};
      }
      const metricName = MetricsLabelsMappping[metricDataResult.Label];
      instancesMetrics[instanceId][metricName] = {timestamps:metricDataResult.Timestamps, values:metricDataResult.Values};
  });

  return instancesMetrics;
}

module.exports = {
  getInstancesMetrics
}