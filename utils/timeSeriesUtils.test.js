const {timeSeriesScalarOperation, multiTimeSeriesScalarOperation} = require('./timeSeriesUtils');
const TimeSeries = require('../models/timeSeries');


describe('timeSeriesScalarOperation', () => {
  test('it should return the sum of the values', () => {
    const timeSeries = {
      cpu: [["0", 1], ["1", 1], ["2", 1]],
      disk: [["0", 1], ["1", 1], ["2", 1]],
      network: [["0", 1], ["1", 1], ["2", 1]],
    };
    const operator = (payload) => {
      return payload.cpu + payload.disk + payload.network;
    };
    const result = timeSeriesScalarOperation(timeSeries, operator);
    expect(result).toEqual([["0", 3], ["1", 3], ["2", 3]]);
  });
});

describe('multiTimeSeriesScalarOperation', () => {
  test('it should return the sum of the values', () => {
   const timestamps =  ["2022-11-07T22:17:00.000Z", "2022-11-07T21:17:00.000Z", "2022-11-07T20:17:00.000Z"].map(t => new Date(t)).map(d => d.toISOString());
    const timeSeriesVectorsArray = [
      new TimeSeries('cpu', [1, 1, 1], timestamps),
      new TimeSeries('disk', [2, 2, 2], timestamps),
      new TimeSeries('network', [3, 3, 4], timestamps),
    ];
    const operator = (payload) => {
      return payload.cpu + payload.disk + payload.network;
    };
    const result = multiTimeSeriesScalarOperation(timeSeriesVectorsArray, operator);
    expect(result).toEqual(new TimeSeries('', [6, 6, 7], timestamps));
  });

  test('it should return a union of time stamped values if timestamps vectors are not aligned', () => {
    const timestampsA =  ["2022-11-07T22:17:00.000Z", "2022-11-07T21:17:00.000Z", "2022-11-07T20:17:00.000Z"].map((t) => new Date(t)).map((d) => d.toISOString());
    const timestampsB =  ["2022-11-07T22:17:00.000Z"].map((t) => new Date(t)).map((d) => d.toISOString());
    const timeSeriesVectorsArray = [
      new TimeSeries('a', [1, 1, 1], timestampsA),
      new TimeSeries('b', [2], timestampsB),

    ];
    const operator = (payload) => {
      if(payload.a && payload.b) {
        return payload.a + payload.b;
      } else {
        return 'no data';
      }
    };
    const result = multiTimeSeriesScalarOperation(timeSeriesVectorsArray, operator);
    expect(result).toEqual(new TimeSeries('', [3,'no data', 'no data'], timestampsA));
  });

  test(' test with real data', () => {

  });
});