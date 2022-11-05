const convertToObject = (timeseriesVector) => {
  const timeSeriesDataObject = {};
  timeseriesVector.forEach((datapoint) => {
    timeSeriesDataObject[datapoint[0]] = datapoint[1];
  });
  return timeSeriesDataObject;
}

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
 *
 * @param timeSeries   {timeSeriesName1:[[timestamp1,value1],[timestamp2,value2]], timeSeriesName2:[[timestamp1,value1],[timestamp2,value2]]}
 * @param operator     callback that takes an object of per timeseries key value pairs and returns a single value
 * @returns [[timestamp1,value1],[timestamp2,value2]]  calculated per-time values sorted by timestamp
 */
const timeSeriesScalarOperation = function (timeSeries, operator) { // metrics {cpu:[[ts,measurement]],disk,...}

  let res = [];
  let aggregatedDataPoints = {}

  //{cpu : { ts1: measurment},...}
  Object.keys(timeSeries).forEach((key) => {
    aggregatedDataPoints[key] = convertToObject(timeSeries[key]);
  });


  let sortedTimestampsUnion = union(Object.values(aggregatedDataPoints).map((datapoints) => Object.keys(datapoints))).sort(); // sorted array of timestamps

  sortedTimestampsUnion.forEach((ts) => {
    const payload = {};
    Object.keys(aggregatedDataPoints).forEach((key) => {
      payload[key] = aggregatedDataPoints[key][ts];
    });
    res.push([ts, operator(payload)]);
  });
  return res;

}

module.exports = {
  timeSeriesScalarOperation
}