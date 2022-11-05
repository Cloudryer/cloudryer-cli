const {
  CostExplorerClient,
  GetCostAndUsageWithResourcesCommand,
  GetDimensionValuesCommand
} = require("@aws-sdk/client-cost-explorer");
const {convertDateObjectToAwsDate} = require('./utils');

const PRICING_AWS_REGION = 'us-east-1';

/**
 * Get the average cost per hour for the given resource type
 * @returns {Promise<{instanceId:cost}>}
 */
const getAverageResourcesCostPerHour = async function () {
  const toDate = new Date();
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - 7);

  const fromDateAws = convertDateObjectToAwsDate(fromDate);
  const toDateAws = convertDateObjectToAwsDate(toDate);
  const resourcesCostOverTime = {};
  const client = new CostExplorerClient({region: 'us-west-2'});


  // In case we want to filter by specific resources
  // const {DimensionValues} = await client.send(new GetDimensionValuesCommand({
  //   Dimension: 'RESOURCE_ID',
  //   TimePeriod: {Start: fromDateAws, End: toDateAws}
  // }));
  // const machineIds = DimensionValues.filter(dimensionValue => dimensionValue.Value.length > 0)
  //   .map(dimensionValue => dimensionValue.Value);
  let fetchNextPage = true;
  let nextToken = null;
  while (fetchNextPage) {
    const payload = {
      Granularity: 'HOURLY',
      Metrics: ['UnblendedCost'],
      TimePeriod: {Start: fromDateAws, End: toDateAws},
      // Filter: {Dimensions: {Key: 'RESOURCE_ID', Values: machineIds}},// in case we want to filter by machine id
      GroupBy: [{Type: 'DIMENSION', Key: 'RESOURCE_ID'}]
    }
    if (nextToken) {
      payload.NextPageToken = nextToken;
    } else {
      fetchNextPage = false;
    }
    const costAndUsage = await client.send(new GetCostAndUsageWithResourcesCommand(payload));
    const {ResultsByTime} = costAndUsage;
    for(let i = ResultsByTime.length - 1; i >= 0; i--) {
      const {Groups} = ResultsByTime[i];


      Groups.forEach(group => {
        const {Keys, Metrics} = group;
        const {UnblendedCost} = Metrics;
        const {Amount, Unit} = UnblendedCost;
        console.assert(Unit === 'USD', 'Unit is not USD');

        const resourceId = Keys[0];
        if (!resourcesCostOverTime[resourceId]) {
          resourcesCostOverTime[resourceId] = [];
        }
        resourcesCostOverTime[resourceId].push(Number.parseFloat(Amount));
      })
    }
  }

  console.log('resourcesCostOverTime', JSON.stringify(resourcesCostOverTime));

  const resourcesAverageCostPerHour = {};
  Object.keys(resourcesCostOverTime).forEach(resourceId => {
    let histogram = {};
    resourcesCostOverTime[resourceId].forEach((cost) => {
      histogram[cost] = histogram[cost] ? histogram[cost] + 1 : 1;
    });
    let freqArray = Object.keys(histogram).map((key) => [key, histogram[key]]).sort((first, second) => second[1] - first[1])
    if (freqArray[0][1] > 1) {
      resourcesAverageCostPerHour[resourceId] = Number.parseFloat(freqArray[0][0]);
    } else {
      const totalCost = resourcesCostOverTime[resourceId].reduce((acc, cost) => acc + cost, 0);
      const averageCost = totalCost / resourcesCostOverTime[resourceId].length;
      resourcesAverageCostPerHour[resourceId] = averageCost;
    }

  });
  return resourcesAverageCostPerHour;

}

module.exports = {
  getAverageResourcesCostPerHour
}