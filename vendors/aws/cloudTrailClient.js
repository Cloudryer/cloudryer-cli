const {CloudTrailClient, LookupEventsCommand} = require('@aws-sdk/client-cloudtrail');

/**
 *
 * @param regions
 * @returns {Promise<{}>}
 */
const lookUpInstancesEvents = async function (regions) {
  const instancesEvents = {};

  for (let region of regions) {

    const client = new CloudTrailClient({region: region});
    const params = {
      LookupAttributes: [{
        AttributeKey: 'ResourceType',
        AttributeValue: 'AWS::EC2::Instance'
      }]
    };

    try {
      let fetchNextPage = true;
      let nextToken = null;
      while (fetchNextPage) {
        if (nextToken) {
          params.NextToken = nextToken;
        }
        const data = await client.send(new LookupEventsCommand(params));
        if (data.NextToken) {
          nextToken = data.NextToken;
        } else {
          fetchNextPage = false;
        }
        data.Events.forEach((event) => {
          const {EventName, EventTime, Resources, Username, CloudTrailEvent} = event;
          const details = JSON.parse(CloudTrailEvent);
          Resources.filter((resource) => resource.ResourceType === 'AWS::EC2::Instance')
            .forEach((resource) => {
              const {ResourceName} = resource;
              if (!instancesEvents[ResourceName]) {
                instancesEvents[ResourceName] = [];
              }
              instancesEvents[ResourceName].push({
                name: EventName,
                date: new Date(EventTime),
                username: Username
              });
            });
        });
      }
    } catch (error) {
      console.error('Warning:', `Failed to get events for region ${region}`);
    }
  }
  return instancesEvents;
}
module.exports = {
  lookUpInstancesEvents
}