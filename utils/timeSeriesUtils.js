import TimeSeries from '../models/timeSeries.js';


const union = (arrays) => {
  let set = new Set();
  arrays.forEach((array) => {
    array.forEach((element) => {
      set.add(element);
    });
  });
  return Array.from(set);
}

/**
 * Scalar opearation on a vector of time series
 * @param timeSeriesVectorsArray
 * @param operator
 * @returns {TimeSeries}
 */
const multiTimeSeriesScalarOperation = function (timeSeriesVectorsArray, operator) {
  let res = new TimeSeries('', [], []);
  let aggregatedDataPoints = {}

  timeSeriesVectorsArray.forEach((timeSeriesVector) => {
    aggregatedDataPoints[timeSeriesVector.getName()] = timeSeriesVector.getTimeStampsValuesObject();
  });

  let sortedTimestampsUnion = union(timeSeriesVectorsArray.map((timeseries) =>
    timeseries.getTimestamps())).map(t => new Date(t)).sort((a, b) => b - a).map(date => date.toISOString()); // sorted array of timestamps

  sortedTimestampsUnion.forEach((ts) => {
    const payload = {};
    Object.keys(aggregatedDataPoints).forEach((key) => {
      payload[key] = aggregatedDataPoints[key][ts];
    });
    res.addValue(operator(payload), new Date(ts));
  });
  return res;
}

/**
 * Scalar sum of two time series with the same timestamps
 * @param timeSeries1
 * @param timeSeries2
 * @param newTimeSeriesName
 * @returns {TimeSeries}
 */
const sumTwoTimeSeries = function (timeSeries1, timeSeries2, newTimeSeriesName) {
  // console.assert(timeSeries1.getTimestamps().length === timeSeries2.getTimestamps().length);
  // console.assert(timeSeries1.getTimestamps().every((timestamp, index) => timestamp === timeSeries2.getTimestamps()[index]));

  const sumValues = timeSeries1.getValues().map((value, index) => value + timeSeries2.getValues()[index]);
  return new TimeSeries(newTimeSeriesName, sumValues, timeSeries1.getTimestamps());
}


export {multiTimeSeriesScalarOperation, sumTwoTimeSeries};