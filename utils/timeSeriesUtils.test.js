const {timeSeriesScalarOperation} = require('./timeSeriesUtils');


describe('timeSeriesScalarOperation', () => {
  test('it should return the sum of the values', () => {
    const timeSeries = {
      cpu: [["0", 1], ["1", 1], ["2", 1]],
      disk:[["0", 1], ["1", 1], ["2", 1]],
      network: [["0", 1], ["1", 1], ["2", 1]],
    };
    const operator = (payload) => {
      return payload.cpu + payload.disk + payload.network;
    };
    const result = timeSeriesScalarOperation(timeSeries, operator);
    expect(result).toEqual([["0", 3], ["1", 3], ["2", 3]]);
  });
});