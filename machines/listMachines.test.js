const {States, Metrics, Waste, Machine, Resource, Cost, OperatingSystems} = require('../models/metadata');
const {getEc2Instances} = require('../vendors/aws/ec2Client');
const {getAverageResourcesCostPerHour} = require('../vendors/aws/costClient');
const {getInstancesMetrics} = require('../vendors/aws/metricsClient');
const {lookUpInstancesEvents} = require('../vendors/aws/cloudTrailClient');
const listMachines = require('./listMachines');
const TimeSeries = require('../models/timeSeries');

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

    const region = 'us-east-1';
    const evaluationPeriod = 3 / 24;
    const state = States.Running;
    const date = '2019-01-01';
    const timestamps = ["2022-11-07T22:17:00.000Z", "2022-11-07T21:17:00.000Z", "2022-11-07T20:17:00.000Z"];

    // printMachines.mockResolvedValueOnce();
    getAverageResourcesCostPerHour.mockResolvedValueOnce({[instanceId]: new TimeSeries(Cost.CostPerHour, [1, 1, 1], timestamps)});
    getEc2Instances.mockResolvedValueOnce([{
      [Machine.InstanceID]: instanceId,
      [Resource.Region]: region,
      [Machine.InstanceType]: instanceType,
      [Machine.State]: state,
      [Resource.CreationDate]: date,
      [Machine.OperatingSystem]: OperatingSystems.Linux
    }]);
    lookUpInstancesEvents.mockResolvedValueOnce([]);
    getInstancesMetrics.mockResolvedValueOnce({
      [instanceId]: {
        [Metrics.UpTime]: new TimeSeries(Metrics.UpTime, [1, 1, 1], timestamps),
        [Metrics.CPU]: new TimeSeries(Metrics.CPU, [0, 50, 50], timestamps),
        [Metrics.DiskReadOps]: new TimeSeries(Metrics.DiskReadOps, [0, 400, 100], timestamps),
        [Metrics.DiskWriteOps]: new TimeSeries(Metrics.DiskWriteOps, [0, 53, 23], timestamps),
        [Metrics.NetworkPacketsIn]: new TimeSeries(Metrics.NetworkPacketsIn, [0, 23, 120], timestamps),
        [Metrics.NetworkPacketsOut]: new TimeSeries(Metrics.NetworkPacketsOut, [0, 100, 3], timestamps)
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
      [Resource.Region]: region,
      [Machine.OperatingSystem]: OperatingSystems.Linux,
      [Metrics.CPU]: 50,
      [Metrics.DiskReadWriteOps]: 123,
      [Metrics.NetworkPacketsInOut]: 123,
      [Cost.TotalCost]: 0.0348,
      [Metrics.UpTime]: 3,
      [Waste.TotalWaste]: 0.0116,
      [Waste.IdlePct]: "33.33%",
      [Waste.EvalPeriod]: evaluationPeriod,
      [Resource.Creator]: 'unknown',
      [Resource.CreationDate]: new Date(date),
    }]);
  });
});