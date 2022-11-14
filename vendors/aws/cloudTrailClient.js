const {CloudTrailClient, LookupEventsCommand} = require('@aws-sdk/client-cloudtrail');
const {AuditEvent, AuditEventTypes, Machine, OperatingSystems, States, Resource} = require('../../models/metadata');


const EventNameToAuditEventType = {
  'RunInstances': AuditEventTypes.CreateMachine,
  'StartInstances': AuditEventTypes.StartMachine,
  'StopInstances': AuditEventTypes.StopMachine,
  'TerminateInstances': AuditEventTypes.TerminateMachine
}


const lookUpInstancesEventsPerRegion = async function (region) {
  const instancesEvents = {};
  const instancesInfo = {};


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
        let auditEventType = EventNameToAuditEventType[EventName];
        if (!auditEventType) auditEventType = AuditEventTypes.Other;

        //create instances info from events
        if (auditEventType === AuditEventTypes.CreateMachine || auditEventType === AuditEventTypes.TerminateMachine) {
          const details = JSON.parse(CloudTrailEvent);
          details.responseElements.instancesSet.items.forEach((instance) => {
            const instanceId = instance.instanceId;
            if (auditEventType === AuditEventTypes.CreateMachine) {
              instancesInfo[instanceId] = {
                ...instancesInfo[instanceId],
                [Machine.InstanceID]: instanceId,
                [Resource.Region]: region,
                [Machine.InstanceType]: instance.instanceType,
                [Resource.CreationDate]: new Date(instance.launchTime).toISOString(),
                [Machine.OperatingSystem]: !instance.platform ? OperatingSystems.Linux : OperatingSystems.Windows,
                [Resource.Creator]: Username,
              };
            } else {
              instancesInfo[instanceId] = {
                ...instancesInfo[instanceId],
                [Machine.State]: States.Terminated,
              }
            }
          });
        }
        let instanceIds = Resources.filter((resource) => resource.ResourceType === 'AWS::EC2::Instance').map((resource) => resource.ResourceName);

        instanceIds.forEach((instanceId) => {
          if (!instancesEvents[instanceId]) {
            instancesEvents[instanceId] = [];
          }
          instancesEvents[instanceId].push({
            [AuditEvent.Type]: auditEventType,
            [AuditEvent.Date]: new Date(EventTime).toISOString(),
            [AuditEvent.Username]: Username,
          });
        });
      });
    }
  } catch
    (error) {
    console.error('Warning:', `Failed to get events for region ${region}`);
  }

  return {instancesEvents, instancesInfo};
}

const lookUpInstancesEvents = async function (regions) {
  let instancesEvents = {};
  let instancesInfo = {};
  for (let region of regions) {
    const {
      instancesEvents: regionInstancesEvents,
      instancesInfo: regionInstancesInfo
    } = await lookUpInstancesEventsPerRegion(region);
    instancesEvents = {...instancesEvents, ...regionInstancesEvents};
    instancesInfo = {...instancesInfo, ...regionInstancesInfo};
  }
  return {instancesEvents, instancesInfo};

}
module.exports = {
  lookUpInstancesEvents
}