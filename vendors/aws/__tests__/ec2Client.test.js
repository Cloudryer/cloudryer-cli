import {jest} from '@jest/globals';
import {Machine, States, Resource} from '../../../models/metadata.js';



// this is just a hack to resolve ESM loaidng issues
jest.unstable_mockModule('../../../utils/printingUtils.js', () => {
  return {
    printUpdate: jest.fn()
  };
});


jest.unstable_mockModule('@aws-sdk/client-ec2', () => {
  return {
    DescribeInstancesCommand: jest.fn(),
    EC2Client: jest.fn().mockImplementation(() => {
      return {
        send: jest.fn().mockImplementation(() => {
          return {
            "$metadata": {
              "httpStatusCode": 200,
              "requestId": "6d4ae2e7-bdaf-469b-8fdb-7774e05bf620",
              "attempts": 1,
              "totalRetryDelay": 0
            },
            "Reservations": [
              {
                "Groups": [],
                "Instances": [
                  {
                    "AmiLaunchIndex": 0,
                    "ImageId": "ami-09d3b3274b6c5d4aa",
                    "InstanceId": "i-08b3f8f7dcc08d7e4",
                    "InstanceType": "t2.micro",
                    "KeyName": "cloudryer_sandbox",
                    "LaunchTime": "2022-11-07T18:26:28.000Z",
                    "Monitoring": {
                      "State": "disabled"
                    },
                    "Placement": {
                      "AvailabilityZone": "us-east-1a",
                      "GroupName": "",
                      "Tenancy": "default"
                    },
                    "PrivateDnsName": "ip-172-31-22-17.ec2.internal",
                    "PrivateIpAddress": "172.31.22.17",
                    "ProductCodes": [],
                    "PublicDnsName": "ec2-54-92-219-48.compute-1.amazonaws.com",
                    "PublicIpAddress": "54.92.219.48",
                    "State": {
                      "Code": 16,
                      "Name": "running"
                    },
                    "StateTransitionReason": "",
                    "SubnetId": "subnet-ff9ec5b2",
                    "VpcId": "vpc-e9e14694",
                    "Architecture": "x86_64",
                    "BlockDeviceMappings": [
                      {
                        "DeviceName": "/dev/xvda",
                        "Ebs": {
                          "AttachTime": "2022-11-07T18:26:29.000Z",
                          "DeleteOnTermination": true,
                          "Status": "attached",
                          "VolumeId": "vol-07ad9cefdcb8a860f"
                        }
                      }
                    ],
                    "ClientToken": "87b693e3-0246-4fa9-953c-418af376f25d",
                    "EbsOptimized": false,
                    "EnaSupport": true,
                    "Hypervisor": "xen",
                    "NetworkInterfaces": [
                      {
                        "Association": {
                          "IpOwnerId": "amazon",
                          "PublicDnsName": "ec2-54-92-219-48.compute-1.amazonaws.com",
                          "PublicIp": "54.92.219.48"
                        },
                        "Attachment": {
                          "AttachTime": "2022-11-07T18:26:28.000Z",
                          "AttachmentId": "eni-attach-06ef86ee51058174c",
                          "DeleteOnTermination": true,
                          "DeviceIndex": 0,
                          "Status": "attached",
                          "NetworkCardIndex": 0
                        },
                        "Description": "",
                        "Groups": [
                          {
                            "GroupName": "launch-wizard-1",
                            "GroupId": "sg-04bd74569fe50fdb5"
                          }
                        ],
                        "Ipv6Addresses": [],
                        "MacAddress": "0a:da:a0:1e:c0:27",
                        "NetworkInterfaceId": "eni-0e2047025f1642a88",
                        "OwnerId": "450502852875",
                        "PrivateDnsName": "ip-172-31-22-17.ec2.internal",
                        "PrivateIpAddress": "172.31.22.17",
                        "PrivateIpAddresses": [
                          {
                            "Association": {
                              "IpOwnerId": "amazon",
                              "PublicDnsName": "ec2-54-92-219-48.compute-1.amazonaws.com",
                              "PublicIp": "54.92.219.48"
                            },
                            "Primary": true,
                            "PrivateDnsName": "ip-172-31-22-17.ec2.internal",
                            "PrivateIpAddress": "172.31.22.17"
                          }
                        ],
                        "SourceDestCheck": true,
                        "Status": "in-use",
                        "SubnetId": "subnet-ff9ec5b2",
                        "VpcId": "vpc-e9e14694",
                        "InterfaceType": "interface"
                      }
                    ],
                    "RootDeviceName": "/dev/xvda",
                    "RootDeviceType": "ebs",
                    "SecurityGroups": [
                      {
                        "GroupName": "launch-wizard-1",
                        "GroupId": "sg-04bd74569fe50fdb5"
                      }
                    ],
                    "SourceDestCheck": true,
                    "Tags": [
                      {
                        "Key": "Name",
                        "Value": "testing"
                      }
                    ],
                    "VirtualizationType": "hvm",
                    "CpuOptions": {
                      "CoreCount": 1,
                      "ThreadsPerCore": 1
                    },
                    "CapacityReservationSpecification": {
                      "CapacityReservationPreference": "open"
                    },
                    "HibernationOptions": {
                      "Configured": false
                    },
                    "MetadataOptions": {
                      "State": "applied",
                      "HttpTokens": "optional",
                      "HttpPutResponseHopLimit": 1,
                      "HttpEndpoint": "enabled",
                      "HttpProtocolIpv6": "disabled",
                      "InstanceMetadataTags": "disabled"
                    },
                    "EnclaveOptions": {
                      "Enabled": false
                    },
                    "PlatformDetails": "Linux/UNIX",
                    "UsageOperation": "RunInstances",
                    "UsageOperationUpdateTime": "2022-11-07T18:26:28.000Z",
                    "PrivateDnsNameOptions": {
                      "HostnameType": "ip-name",
                      "EnableResourceNameDnsARecord": true,
                      "EnableResourceNameDnsAAAARecord": false
                    },
                    "MaintenanceOptions": {
                      "AutoRecovery": "default"
                    }
                  }
                ],
                "OwnerId": "450502852875",
                "ReservationId": "r-061874ab9175b555d"
              }
            ]
          }
        })
      }
    }),

  }
});

describe('getEc2Instances', () => {
  test('it should return an object with all the running instances in each region', async () => {
    const {getEc2Instances} = (await import('../ec2Client.js'));
    const result = await getEc2Instances(['us-east-1']);
    expect(result).toEqual({
      'i-08b3f8f7dcc08d7e4':
        {
          [Resource.Region]: "us-east-1",
          [Machine.InstanceID]: 'i-08b3f8f7dcc08d7e4',
          [Machine.InstanceType]: 't2.micro',
          [Machine.State]: States.Running,
          [Resource.CreationDate]: new Date('2022-11-07T18:26:28.000Z'),
          [Machine.OperatingSystem]: 'Linux',
          "firstTimeNetworkInterfacedAttached": new Date('2022-11-07T18:26:28.000Z'),
          [Machine.KeyName]: 'cloudryer_sandbox',
          awsInfo: {
            "architecture": "x86_64",
            "description": undefined,
            "imageId": "ami-09d3b3274b6c5d4aa",
            "launchTime": "2022-11-07T18:26:28.000Z",
            "licenses": undefined,
            "platform": undefined,
            "platformDetails": "Linux/UNIX",
            "stateReason": undefined,
            "stateTransitionReason": "",
            "tags": [
              {
                "Key": "Name",
                "Value": "testing",
              }],
            "usageOperationUpdateTime": "2022-11-07T18:26:28.000Z",

          }
        }
    });
  });
});
