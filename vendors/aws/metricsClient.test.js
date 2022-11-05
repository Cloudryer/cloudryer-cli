const {getInstancesMetrics} = require('./metricsClient');

const perRegionInstances = {'us-west-2': ['i-1234567890abcdef0']};

jest.setTimeout(30000);
describe('getInstancesMetrics', () => {
  test('it should return the metrics for the given instances', async () => {

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 1000 * 60 * 60 * 24 * 7);
    const result = await getInstancesMetrics({perRegionInstances,startDate,endDate});
    expect(result).toEqual({});
  });
});