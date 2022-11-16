import {jest} from '@jest/globals';
import {States, Metrics, Waste, Machine, Resource, Cost, OperatingSystems} from '../../models/metadata';
import TimeSeries from "../../models/timeSeries.js";

jest.unstable_mockModule('../../vendors/aws/ec2Client.js', () => {
  return {
    getEc2Instances: jest.fn()
  };
});

jest.unstable_mockModule('../../vendors/aws/metricsClient.js', () => {
  return {
    getInstancesMetrics: jest.fn()
  };
});

jest.unstable_mockModule('../../vendors/aws/cloudTrailClient.js', () => {
  return {
    lookUpInstancesEvents: jest.fn()
  };
});

jest.unstable_mockModule('../../utils/printingUtils.js', () => {
  return {
    printUpdate: jest.fn()
  };
});

describe('listMachines', () => {
  test('it should return estimated cost if no events exist', async () => {
    const {getEc2Instances} = (await import('../../vendors/aws/ec2Client.js'));
    const {getInstancesMetrics} = (await import('../../vendors/aws/metricsClient.js'));
    const {lookUpInstancesEvents} = (await import('../../vendors/aws/cloudTrailClient.js'));
    const {listMachines} = (await import('../listMachines.js'));


    const instanceId = 'i-1234567890abcdef0';
    const instanceType = 't2.micro';

    const region = 'us-east-1';
    const evaluationPeriod = 3 / 24;
    const state = States.Running;
    const date = '2019-01-01';
    const timestamps = ["2022-11-07T22:17:00.000Z", "2022-11-07T21:17:00.000Z", "2022-11-07T20:17:00.000Z"];

    getEc2Instances.mockResolvedValueOnce({
      [instanceId]: {
        [Machine.InstanceID]: instanceId,
        [Resource.Region]: region,
        [Machine.InstanceType]: instanceType,
        [Machine.State]: state,
        [Resource.CreationDate]: date,
        [Machine.OperatingSystem]: OperatingSystems.Linux
      }
    });
    lookUpInstancesEvents.mockResolvedValueOnce({instancesInfo: {}});
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


  // test('it should calculate cost for machines that are terminated', async () => {
  //   const timestamps = ["2022-11-01T23:17:00.000Z", "2022-11-01T22:17:00.000Z", "2022-11-01T21:17:00.000Z"];
  //   lookUpInstancesEvents.mockResolvedValueOnce({
  //     instancesEvents: {
  //       "i-052b067f18ed43dc6": [
  //         {
  //           "Type": "TerminateMachine",
  //           "Date": "2022-11-01T23:22:31.000Z",
  //           "Username": "root"
  //         },
  //         {
  //           "Type": "StopMachine",
  //           "Date": "2022-11-01T23:16:45.000Z",
  //           "Username": "root"
  //         },
  //         {
  //           "Type": "CreateMachine",
  //           "Date": "2022-11-01T21:03:08.000Z",
  //           "Username": "root"
  //         }
  //       ],
  //     },
  //     instancesInfo: {
  //       "i-052b067f18ed43dc6": {
  //         "State": "Terminated",
  //         "InstanceID": "i-052b067f18ed43dc6",
  //         "Region": "us-east-1",
  //         "InstanceType": "t2.micro",
  //         "CreationDate": "2022-11-01T21:03:08.000Z",
  //         "OperatingSystem": "Linux",
  //         "Creator": "ziv"
  //       },
  //     }
  //   });
  //   getEc2Instances.mockResolvedValueOnce({});
  //   getInstancesMetrics.mockResolvedValueOnce({
  //     'i-052b067f18ed43dc6': {
  //       [Metrics.UpTime]: new TimeSeries(Metrics.UpTime, [1, 1, 1], timestamps),
  //       [Metrics.CPU]: new TimeSeries(Metrics.CPU, [0, 50, 50], timestamps),
  //       [Metrics.DiskReadOps]: new TimeSeries(Metrics.DiskReadOps, [0, 400, 100], timestamps),
  //       [Metrics.DiskWriteOps]: new TimeSeries(Metrics.DiskWriteOps, [0, 53, 23], timestamps),
  //       [Metrics.NetworkPacketsIn]: new TimeSeries(Metrics.NetworkPacketsIn, [0, 23, 120], timestamps),
  //       [Metrics.NetworkPacketsOut]: new TimeSeries(Metrics.NetworkPacketsOut, [0, 100, 3], timestamps)
  //     }
  //   });
  //
  //   const result = await listMachines({
  //     hideUtilization: false,
  //     calculateWaste: true,
  //     evaluationPeriod: 90
  //   });
  //   expect(result).toEqual([{
  //     [Machine.InstanceID]: 'i-052b067f18ed43dc6',
  //     [Machine.State]: States.Terminated,
  //     [Machine.InstanceType]: 't2.micro',
  //     [Resource.Region]: 'us-east-1',
  //     [Machine.OperatingSystem]: OperatingSystems.Linux,
  //     [Metrics.CPU]: 50,
  //     [Metrics.DiskReadWriteOps]: 123,
  //     [Metrics.NetworkPacketsInOut]: 123,
  //     [Cost.TotalCost]: 0.0348,
  //     [Metrics.UpTime]: 3,
  //     [Waste.TotalWaste]: 0.0116,
  //     [Waste.IdlePct]: "33.33%",
  //     [Waste.EvalPeriod]: 90,
  //     [Resource.Creator]: 'ziv',
  //     [Resource.CreationDate]: new Date('2022-11-01T21:03:08.000Z'),
  //   }]);
  // });
});