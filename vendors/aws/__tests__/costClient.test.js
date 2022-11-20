import {jest} from '@jest/globals';
import TimeSeries from '../../../models/timeSeries.js';
import {Cost} from '../../../models/metadata.js';

// this is just a hack to resolve ESM loaidng issues
jest.unstable_mockModule('../../../utils/printingUtils.js', () => {
  return {
    printUpdate: jest.fn()
  };
});

jest.unstable_mockModule('@aws-sdk/client-cost-explorer', () => {
  return {
    GetCostAndUsageWithResourcesCommand: jest.fn(),
    CostExplorerClient: jest.fn().mockImplementation(() => {
      return {
        send: jest.fn().mockImplementation(() => {
          return {
            ResultsByTime: [
              {
                "Estimated": true,
                "Groups": [
                  {
                    "Keys": [
                      "NoResourceId"
                    ],
                    "Metrics": {
                      "UnblendedCost": {
                        "Amount": "0.0397888",
                        "Unit": "USD"
                      }
                    }
                  }
                ],
                "TimePeriod": {
                  "End": "2022-11-01T21:00:00Z",
                  "Start": "2022-11-01T20:00:00Z"
                },
                "Total": {}
              },
              {
                "Estimated": true,
                "Groups": [
                  {
                    "Keys": [
                      "NoResourceId"
                    ],
                    "Metrics": {
                      "UnblendedCost": {
                        "Amount": "-0.0329692165",
                        "Unit": "USD"
                      }
                    }
                  },
                  {
                    "Keys": [
                      "i-052b067f18ed43dc6"
                    ],
                    "Metrics": {
                      "UnblendedCost": {
                        "Amount": "0.0116",
                        "Unit": "USD"
                      }
                    }
                  }
                ],
                "TimePeriod": {
                  "End": "2022-11-01T22:00:00Z",
                  "Start": "2022-11-01T21:00:00Z"
                },
                "Total": {}
              },
              {
                "Estimated": true,
                "Groups": [
                  {
                    "Keys": [
                      "NoResourceId"
                    ],
                    "Metrics": {
                      "UnblendedCost": {
                        "Amount": "0.0012469111",
                        "Unit": "USD"
                      }
                    }
                  },
                  {
                    "Keys": [
                      "i-052b067f18ed43dc6"
                    ],
                    "Metrics": {
                      "UnblendedCost": {
                        "Amount": "0.0116",
                        "Unit": "USD"
                      }
                    }
                  }
                ],
                "TimePeriod": {
                  "End": "2022-11-01T23:00:00Z",
                  "Start": "2022-11-01T22:00:00Z"
                },
                "Total": {}
              }]
          }
        })
      }
    }),

  }
});

describe('getAverageResourcesCostPerHour', () => {
  test('it should return a cost per hour timeseries data for each of the resources', async () => {
    const evalationPeriodDays = 7;
    const {getAverageResourcesCostPerHour} = (await import('../costClient.js'));
    let result = await getAverageResourcesCostPerHour(evalationPeriodDays);
    expect(result).toEqual({
      'i-052b067f18ed43dc6': new TimeSeries(Cost.CostPerHour, [0.0116, 0.0116], ["2022-11-01T23:00:00.000Z", "2022-11-01T22:00:00.000Z"]),
      'NoResourceId': new TimeSeries(Cost.CostPerHour, [0.0012469111, -0.0329692165, 0.0397888], ["2022-11-01T23:00:00.000Z","2022-11-01T22:00:00.000Z", "2022-11-01T21:00:00.000Z"])
    });
  });
});