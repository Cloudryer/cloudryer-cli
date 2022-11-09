const {PricingClient, GetProductsCommand} = require("@aws-sdk/client-pricing");
const {
  EC2Client,
  DescribeInstancesCommand,
  DescribeInstanceAttributeCommand,
  DescribeImagesCommand
} = require("@aws-sdk/client-ec2");
const {
  CostExplorerClient,
  GetCostAndUsageWithResourcesCommand,
  GetDimensionValuesCommand
} = require("@aws-sdk/client-cost-explorer");
const PRICING_AWS_REGION = 'us-east-1';

const getAverageResourcesCostPerHour = async function () {
  const client = new CostExplorerClient({region: 'us-west-2'});
  const dimensionsValues = await client.send(new GetDimensionValuesCommand({
    Dimension: 'RESOURCE_ID',
    TimePeriod: {Start: '2022-10-20', End: '2022-10-31'}
  }));
  // await client.send(new GetCostAndUsageWithResourcesCommand({Granularity: 'HOURLY', Metrics: ['UnblendedCost'], }));
  console.log('dimensionsValues', JSON.stringify(dimensionsValues));
}



/**
 * Return a list instances metric values
 * @param instances
 * @param metricNames
 * @returns {Promise<[{ instanceId : { metric : [<metric value>] , timestamps : [] } }]>}
 */
const getInstancesMetrics = async function (instances, metricNames) {
  let instancesMetrics = {};

  // { instanceId : { metric : [<metric value>] , timestamps : [] } }
  return instancesMetrics;
}

/**
 * Returns an object with cost per hour for each machine type
 * @returns {Promise<{machineType:pricePerHour}>}
 */
const getInstancesPricing = async function () {
  const client = new PricingClient({region: PRICING_AWS_REGION});

  const commandInput = {ServiceCode: "AmazonEC2"};
  let fetchNextBatch = true;
  const onDemandPricingMap = {};
// async/await.
  try {
    while (fetchNextBatch) {
      const data = await client.send(new GetProductsCommand(commandInput));
      const priceList = data.PriceList;
      priceList.forEach((priceItem) => {
        const {product, terms} = JSON.parse(priceItem);
        const {attributes} = product;
        const {OnDemand} = terms;

        if (attributes.instanceType === 'r5n.8xlarge') {
          console.log('priceItem', priceItem);
        }

        if (OnDemand) {
          const costPerHr = Number.parseFloat(Object.values(Object.values(OnDemand)[0]["priceDimensions"])[0]["pricePerUnit"]["USD"]);
          if (onDemandPricingMap[attributes.instanceType + "_" + attributes.regionCode]) {
            console.log("already exists");
          }

          onDemandPricingMap[attributes.instanceType + "_" + attributes.regionCode] = costPerHr;
        }
      });
      console.log(Object.keys(onDemandPricingMap).length + " machine types found");
      // if (data.NextToken) {
      //   commandInput.NextToken = data.NextToken;
      // } else {
      fetchNextBatch = false;
      // }
    }

    return onDemandPricingMap;
  } catch (error) {
    console.error(error);// error handling.
  } finally {
    // finally.
  }


}


module.exports = {
  getInstancesMetrics,
  getInstancesPricing
}

