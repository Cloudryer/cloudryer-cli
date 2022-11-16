import {CostExplorerClient, GetCostAndUsageWithResourcesCommand} from '@aws-sdk/client-cost-explorer';
import {convertDateObjectToAwsDate} from './utils.js';
import {Cost} from '../../models/metadata.js';
import TimeSeries from '../../models/timeSeries.js';

const COST_EXPLORER_REGION_ENDPOINT = 'us-east-1';

/**
 * Get the average cost per hour for the given resource type
 * @returns {Promise<{instanceId:cost}>}
 */
const getAverageResourcesCostPerHour = async function (evalationPeriodDays) {
  let daysBack = Math.min(14, evalationPeriodDays);
  const toDate = new Date();
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - daysBack);

  const fromDateAws = convertDateObjectToAwsDate(fromDate);
  const toDateAws = convertDateObjectToAwsDate(toDate);
  const resourcesCostOverTime = {};

  const client = new CostExplorerClient({region: COST_EXPLORER_REGION_ENDPOINT});
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
    ResultsByTime.forEach((result) => {
      const {Groups} = result;
      Groups.forEach(group => {
        const {Keys, Metrics} = group;
        const {UnblendedCost} = Metrics;
        const {Amount, Unit} = UnblendedCost;
        const endHour = new Date(result.TimePeriod.End);
        console.assert(Unit === 'USD', 'Unit is not USD');

        const resourceId = Keys[0];
        if (!resourcesCostOverTime[resourceId]) {
          resourcesCostOverTime[resourceId] = new TimeSeries(Cost.CostPerHour, [], []);
        }
        resourcesCostOverTime[resourceId].addFirstValue(Number.parseFloat(Amount), endHour);
      });
    });
  }

  return resourcesCostOverTime;

}

export {getAverageResourcesCostPerHour};