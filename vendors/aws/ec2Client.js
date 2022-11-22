import {Machine, States, Resource, OperatingSystems} from '../../models/metadata.js';
import {EC2Client, DescribeInstancesCommand} from '@aws-sdk/client-ec2';
import {printUpdate} from "../../utils/printingUtils.js";

const STATES_MAPPING = {
  "pending": States.Pending,
  "running": States.Running,
  "shutting-down": States.ShuttingDown,
  "terminated": States.Terminated,
  "stopping": States.Stopping,
  "stopped": States.Stopped,
};


/**
 * Return a list of all instances in a list of regions
 * @param regions
 * @returns {Promise<{}>}
 */
const getEc2Instances = async function (regions) {

  let machinesData = {};
  for (let region of regions) {
    try {
      printUpdate('Fetching instances from EC2 API for region ' + region);
      const ec2Client = new EC2Client({region: region});
      let fetchNextBatch = true;
      let nextToken = null;
      while (fetchNextBatch) {
        const data = await ec2Client.send(new DescribeInstancesCommand({
          NextToken: nextToken
        }));
        if (data.NextToken) {
          nextToken = data.NextToken;
        } else {
          fetchNextBatch = false;
        }

        data.Reservations.forEach((reservation) => {
          reservation.Instances.forEach((instance) => {
            const machineData = {
              [Resource.Region]: region,
              [Machine.InstanceID]: instance.InstanceId,
              [Machine.InstanceType]: instance.InstanceType,
              [Machine.State]: STATES_MAPPING[instance.State.Name],
              [Resource.CreationDate]: new Date(instance.UsageOperationUpdateTime),
              [Machine.OperatingSystem]: !instance.Platform ? OperatingSystems.Linux : OperatingSystems.Windows,
              [Machine.KeyName]: instance.KeyName,
              awsInfo: {
                launchTime: instance.LaunchTime,
                imageId: instance.ImageId,
                tags: instance.Tags,
                architecture: instance.Architecture,
                licenses: instance.Licenses,
                platformDetails: instance.PlatformDetails,
                description: instance.Description,
                stateReason: instance.StateReason,
                stateTransitionReason: instance.StateTransitionReason,
                usageOperationUpdateTime: instance.UsageOperationUpdateTime
              }
            }
            let firstTimeNetworkInterfacedAttached = Number.MAX_VALUE;
            const {NetworkInterfaces} = instance;
            NetworkInterfaces.forEach((networkInterface) => {

              let attachmentTime = new Date(networkInterface.Attachment.AttachTime).getTime();
              firstTimeNetworkInterfacedAttached = Math.min(firstTimeNetworkInterfacedAttached, attachmentTime);
            });
            machineData.firstTimeNetworkInterfacedAttached = new Date(firstTimeNetworkInterfacedAttached);
            machinesData[instance.InstanceId] = machineData;
          });
        });
      }
    } catch (err) {
      console.log("Warning", `Failed to get instances for region ${region}`);
    }
  }
  return machinesData;
}


export {getEc2Instances};