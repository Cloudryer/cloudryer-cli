const {printMachines, printSummary} = require('./printMachines');
const {States,Metrics,Waste,Machine} = require('../machines/metadata');
const {getEc2Instances} = require('../vendors/aws/ec2Client');
const {getAverageResourcesCostPerHour} = require('../vendors/aws/costClient');
const {getInstancesMetrics} = require('../vendors/aws/metricsClient');
const {lookUpInstancesEvents} = require('../vendors/aws/cloudTrailClient');
const {getAwsRegionCodes} = require('../vendors/aws/utils');
const listMachines = require('./listMachines');
const {Cost} = require("./metadata");

jest.mock('./printMachines');
jest.mock('../vendors/aws/ec2Client');
jest.mock('../vendors/aws/costClient');
jest.mock('../vendors/aws/metricsClient');
jest.mock('../vendors/aws/cloudTrailClient');
jest.mock('../vendors/aws/utils');

describe('listMachines', () => {
  test('it should return estimated cost if no events exist', async () => {
    const instanceId = 'i-1234567890abcdef0';
    const instanceType = 't2.micro';
    const costPerHour = [[0, 1], [1, 1], [2, 1]];
    const region = 'us-east-1';
    const evaluationPeriod = 3;
    const state = 'running';

    // printMachines.mockResolvedValueOnce();
    getAverageResourcesCostPerHour.mockResolvedValueOnce({instanceId: costPerHour});
    getEc2Instances.mockResolvedValueOnce([{
      instanceId: instanceId,
      region: region,
      instanceType: instanceType,
      state: state
    }]);
    lookUpInstancesEvents.mockResolvedValueOnce([]);
    getInstancesMetrics.mockResolvedValueOnce({
      [instanceId]: {
        metricValues: {
          cpu: [0, 50, 50],
          disk: [0, 435, 123],
          network: [0, 123, 123]
        },
        metricTimestamps: [0, 1, 2]
      }
    });

    const result = await listMachines({
      hideUtilization: false,
      calculateWaste: true,
      evaluationPeriod: evaluationPeriod
    });
    expect(result).toEqual([{
      [Machine.InstanceID]: instanceId,
      [Machine.State]: States.Running,
      [Machine.InstanceType]: instanceType,
      [Metrics.CPU]: 50,
      [Metrics.Disk]: 123,
      [Metrics.Network]: 123,
      [Cost.TotalCost]: 3,
      [Waste.TotalWaste]: 1,
      [Waste.IdlePct]: 1/3,
      [Waste.EvalPeriod]: 3/24,
      [Machine.Creator]: 'unknown',
    }]);
  });
});