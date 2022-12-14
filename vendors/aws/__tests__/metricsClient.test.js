import {jest} from '@jest/globals';
import {Metrics} from '../../../models/metadata.js';
import TimeSeries from '../../../models/timeSeries.js';

// this is just a hack to resolve ESM loaidng issues
jest.unstable_mockModule('../../../utils/printingUtils.js', () => {
  return {
    printUpdate: jest.fn()
  };
});

const awsResponsePayload = {
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "50f22421-fdd8-492d-9713-bf6173cd9d02",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "MetricDataResults": [
    {
      "Id": "i_08b3f8f7dcc08d7e4_CPUUtilization",
      "Label": "i_08b3f8f7dcc08d7e4 CPUUtilization",
      "Timestamps": [
        "2022-11-07T22:17:00.000Z",
        "2022-11-07T21:17:00.000Z",
        "2022-11-07T20:17:00.000Z",
        "2022-11-07T19:17:00.000Z",
        "2022-11-07T18:17:00.000Z"
      ],
      "Values": [
        1.16666666666667,
        1.18644067796611,
        0.500000000000007,
        19.5,
        13.5593220338983
      ],
      "StatusCode": "Complete"
    },
    {
      "Id": "i_08b3f8f7dcc08d7e4_MetadataNoToken",
      "Label": "i_08b3f8f7dcc08d7e4 MetadataNoToken",
      "Timestamps": [
        "2022-11-07T22:17:00.000Z",
        "2022-11-07T21:17:00.000Z",
        "2022-11-07T20:17:00.000Z",
        "2022-11-07T19:17:00.000Z",
        "2022-11-07T18:17:00.000Z"
      ],
      "Values": [
        0,
        0,
        0,
        0,
        0
      ],
      "StatusCode": "Complete"
    },
    {
      "Id": "i_08b3f8f7dcc08d7e4_NetworkPacketsIn",
      "Label": "i_08b3f8f7dcc08d7e4 NetworkPacketsIn",
      "Timestamps": [
        "2022-11-07T22:17:00.000Z",
        "2022-11-07T21:17:00.000Z",
        "2022-11-07T20:17:00.000Z",
        "2022-11-07T19:17:00.000Z",
        "2022-11-07T18:17:00.000Z"
      ],
      "Values": [
        399,
        531,
        188,
        485,
        500
      ],
      "StatusCode": "Complete"
    },
    {
      "Id": "i_08b3f8f7dcc08d7e4_NetworkPacketsOut",
      "Label": "i_08b3f8f7dcc08d7e4 NetworkPacketsOut",
      "Timestamps": [
        "2022-11-07T22:17:00.000Z",
        "2022-11-07T21:17:00.000Z",
        "2022-11-07T20:17:00.000Z",
        "2022-11-07T19:17:00.000Z",
        "2022-11-07T18:17:00.000Z"
      ],
      "Values": [
        425,
        520,
        135,
        446,
        386
      ],
      "StatusCode": "Complete"
    },
    {
      "Id": "i_08b3f8f7dcc08d7e4_DiskReadOps",
      "Label": "i_08b3f8f7dcc08d7e4 DiskReadOps",
      "Timestamps": [
        "2022-11-07T22:17:00.000Z",
        "2022-11-07T21:17:00.000Z",
        "2022-11-07T20:17:00.000Z",
        "2022-11-07T19:17:00.000Z",
        "2022-11-07T18:17:00.000Z"
      ],
      "Values": [
        0,
        0,
        0,
        0,
        0
      ],
      "StatusCode": "Complete"
    },
    {
      "Id": "i_08b3f8f7dcc08d7e4_DiskWriteOps",
      "Label": "i_08b3f8f7dcc08d7e4 DiskWriteOps",
      "Timestamps": [
        "2022-11-07T22:17:00.000Z",
        "2022-11-07T21:17:00.000Z",
        "2022-11-07T20:17:00.000Z",
        "2022-11-07T19:17:00.000Z",
        "2022-11-07T18:17:00.000Z"
      ],
      "Values": [
        0,
        0,
        0,
        0,
        0
      ],
      "StatusCode": "Complete"
    }
  ],
  "Messages": []
}

jest.unstable_mockModule('@aws-sdk/client-cloudwatch', async () => {
  return {
    GetMetricDataCommand: jest.fn(),
    CloudWatchClient: jest.fn().mockImplementation(() => {
      return {
        send: jest.fn().mockImplementation(() => {
          return Promise.resolve(awsResponsePayload);
        })
      };
    })
  };
});

describe('getInstancesMetrics', () => {
    test('it should return the metrics for the given instances', async () => {
      const perRegionInstances = {'us-east-1': ['i-08b3f8f7dcc08d7e4']};
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 1000 * 60 * 60 * 24 * 7);

      const {getInstancesMetrics} = (await import('../metricsClient.js'));
      const result = await getInstancesMetrics({perRegionInstances, startDate, endDate});

      const timestamps = ["2022-11-07T22:17:00.000Z", "2022-11-07T21:17:00.000Z", "2022-11-07T20:17:00.000Z", "2022-11-07T19:17:00.000Z", "2022-11-07T18:17:00.000Z"];
      const cpuValues = [1.16666666666667, 1.18644067796611, 0.500000000000007, 19.5, 13.5593220338983];
      const networkInValues = [399, 531, 188, 485, 500];
      const networkOutValues = [425, 520, 135, 446, 386];
      const diskReadOpsValues = [0, 0, 0, 0, 0];
      const diskWriteOpsValues = [0, 0, 0, 0, 0];
      const upTimeValues = [1,1,1,1,1]

      expect(result).toEqual({
        'i-08b3f8f7dcc08d7e4': {
          [Metrics.CPU]: new TimeSeries(Metrics.CPU, cpuValues, timestamps),
          [Metrics.NetworkPacketsIn]: new TimeSeries(Metrics.NetworkPacketsIn, networkInValues, timestamps),
          [Metrics.NetworkPacketsOut]: new TimeSeries(Metrics.NetworkPacketsOut, networkOutValues, timestamps),
          [Metrics.DiskReadOps]: new TimeSeries(Metrics.DiskReadOps, diskReadOpsValues, timestamps),
          [Metrics.DiskWriteOps]: new TimeSeries(Metrics.DiskWriteOps, diskWriteOpsValues, timestamps),
          [Metrics.UpTime]: new TimeSeries(Metrics.UpTime, upTimeValues, timestamps),
        }
      });
    });
  }
);
