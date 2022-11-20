import {jest} from "@jest/globals";
import {Machine,OperatingSystems,Resource,States} from '../../../models/metadata.js';
const responsePayload = {
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "d7040037-f152-4ea4-a961-b942b418b5f2",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "Events": [
    {
      "AccessKeyId": "ASIAWRZAQAEF62CRLHQA",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEF62CRLHQA\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-11-09T22:04:46Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-11-09T22:05:16Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"StopInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"instanceId\":\"i-08b3f8f7dcc08d7e4\"}]},\"force\":false},\"responseElements\":{\"requestId\":\"f65e8fd3-8081-4098-aae5-a2f4e3043a6c\",\"instancesSet\":{\"items\":[{\"instanceId\":\"i-08b3f8f7dcc08d7e4\",\"currentState\":{\"code\":64,\"name\":\"stopping\"},\"previousState\":{\"code\":16,\"name\":\"running\"}}]}},\"requestID\":\"f65e8fd3-8081-4098-aae5-a2f4e3043a6c\",\"eventID\":\"2caf11a1-0a46-422c-929d-9d6d3576a46e\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "2caf11a1-0a46-422c-929d-9d6d3576a46e",
      "EventName": "StopInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-11-09T22:05:16.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "i-08b3f8f7dcc08d7e4",
          "ResourceType": "AWS::EC2::Instance"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFTX3ILBRS",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"IAMUser\",\"principalId\":\"AIDAWRZAQAEFRQCTRCKYJ\",\"arn\":\"arn:aws:iam::450502852875:user/ziv\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFTX3ILBRS\",\"userName\":\"ziv\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-11-07T18:25:33Z\",\"mfaAuthenticated\":\"false\"}}},\"eventTime\":\"2022-11-07T18:26:28Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"RunInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"imageId\":\"ami-09d3b3274b6c5d4aa\",\"minCount\":1,\"maxCount\":1,\"keyName\":\"cloudryer_sandbox\"}]},\"instanceType\":\"t2.micro\",\"blockDeviceMapping\":{},\"monitoring\":{\"enabled\":false},\"disableApiTermination\":false,\"disableApiStop\":false,\"clientToken\":\"87b693e3-0246-4fa9-953c-418af376f25d\",\"networkInterfaceSet\":{\"items\":[{\"deviceIndex\":0,\"associatePublicIpAddress\":true,\"groupSet\":{\"items\":[{\"groupId\":\"sg-04bd74569fe50fdb5\"}]}}]},\"ebsOptimized\":false,\"tagSpecificationSet\":{\"items\":[{\"resourceType\":\"instance\",\"tags\":[{\"key\":\"Name\",\"value\":\"testing\"}]}]},\"privateDnsNameOptions\":{\"hostnameType\":\"ip-name\",\"enableResourceNameDnsARecord\":true,\"enableResourceNameDnsAAAARecord\":false}},\"responseElements\":{\"requestId\":\"c6bb92b5-c880-4541-82a4-0366e7e0714a\",\"reservationId\":\"r-061874ab9175b555d\",\"ownerId\":\"450502852875\",\"groupSet\":{},\"instancesSet\":{\"items\":[{\"instanceId\":\"i-08b3f8f7dcc08d7e4\",\"imageId\":\"ami-09d3b3274b6c5d4aa\",\"currentInstanceBootMode\":\"bios\",\"instanceState\":{\"code\":0,\"name\":\"pending\"},\"privateDnsName\":\"ip-172-31-22-17.ec2.internal\",\"keyName\":\"cloudryer_sandbox\",\"amiLaunchIndex\":0,\"productCodes\":{},\"instanceType\":\"t2.micro\",\"launchTime\":1667845588000,\"placement\":{\"availabilityZone\":\"us-east-1a\",\"tenancy\":\"default\"},\"monitoring\":{\"state\":\"disabled\"},\"subnetId\":\"subnet-ff9ec5b2\",\"vpcId\":\"vpc-e9e14694\",\"privateIpAddress\":\"172.31.22.17\",\"stateReason\":{\"code\":\"pending\",\"message\":\"pending\"},\"architecture\":\"x86_64\",\"rootDeviceType\":\"ebs\",\"rootDeviceName\":\"/dev/xvda\",\"blockDeviceMapping\":{},\"virtualizationType\":\"hvm\",\"hypervisor\":\"xen\",\"tagSet\":{\"items\":[{\"key\":\"Name\",\"value\":\"testing\"}]},\"clientToken\":\"87b693e3-0246-4fa9-953c-418af376f25d\",\"groupSet\":{\"items\":[{\"groupId\":\"sg-04bd74569fe50fdb5\",\"groupName\":\"launch-wizard-1\"}]},\"sourceDestCheck\":true,\"networkInterfaceSet\":{\"items\":[{\"networkInterfaceId\":\"eni-0e2047025f1642a88\",\"subnetId\":\"subnet-ff9ec5b2\",\"vpcId\":\"vpc-e9e14694\",\"ownerId\":\"450502852875\",\"status\":\"in-use\",\"macAddress\":\"0a:da:a0:1e:c0:27\",\"privateIpAddress\":\"172.31.22.17\",\"privateDnsName\":\"ip-172-31-22-17.ec2.internal\",\"sourceDestCheck\":true,\"interfaceType\":\"interface\",\"groupSet\":{\"items\":[{\"groupId\":\"sg-04bd74569fe50fdb5\",\"groupName\":\"launch-wizard-1\"}]},\"attachment\":{\"attachmentId\":\"eni-attach-06ef86ee51058174c\",\"deviceIndex\":0,\"networkCardIndex\":0,\"status\":\"attaching\",\"attachTime\":1667845588000,\"deleteOnTermination\":true},\"privateIpAddressesSet\":{\"item\":[{\"privateIpAddress\":\"172.31.22.17\",\"privateDnsName\":\"ip-172-31-22-17.ec2.internal\",\"primary\":true}]},\"ipv6AddressesSet\":{},\"tagSet\":{}}]},\"ebsOptimized\":false,\"enaSupport\":true,\"cpuOptions\":{\"coreCount\":1,\"threadsPerCore\":1},\"capacityReservationSpecification\":{\"capacityReservationPreference\":\"open\"},\"enclaveOptions\":{\"enabled\":false},\"metadataOptions\":{\"state\":\"pending\",\"httpTokens\":\"optional\",\"httpPutResponseHopLimit\":1,\"httpEndpoint\":\"enabled\",\"httpProtocolIpv4\":\"enabled\",\"httpProtocolIpv6\":\"disabled\",\"instanceMetadataTags\":\"disabled\"},\"maintenanceOptions\":{\"autoRecovery\":\"default\"},\"privateDnsNameOptions\":{\"hostnameType\":\"ip-name\",\"enableResourceNameDnsARecord\":true,\"enableResourceNameDnsAAAARecord\":false}}]}},\"requestID\":\"c6bb92b5-c880-4541-82a4-0366e7e0714a\",\"eventID\":\"2018a64c-166e-41dd-b498-a90cb1394152\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "2018a64c-166e-41dd-b498-a90cb1394152",
      "EventName": "RunInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-11-07T18:26:28.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "vpc-e9e14694",
          "ResourceType": "AWS::EC2::VPC"
        },
        {
          "ResourceName": "ami-09d3b3274b6c5d4aa",
          "ResourceType": "AWS::EC2::Ami"
        },
        {
          "ResourceName": "eni-0e2047025f1642a88",
          "ResourceType": "AWS::EC2::NetworkInterface"
        },
        {
          "ResourceName": "i-08b3f8f7dcc08d7e4",
          "ResourceType": "AWS::EC2::Instance"
        },
        {
          "ResourceName": "cloudryer_sandbox",
          "ResourceType": "AWS::EC2::KeyPair"
        },
        {
          "ResourceName": "sg-04bd74569fe50fdb5",
          "ResourceType": "AWS::EC2::SecurityGroup"
        },
        {
          "ResourceName": "launch-wizard-1",
          "ResourceType": "AWS::EC2::SecurityGroup"
        },
        {
          "ResourceName": "subnet-ff9ec5b2",
          "ResourceType": "AWS::EC2::Subnet"
        }
      ],
      "Username": "ziv"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFSVL5XMGM",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFSVL5XMGM\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-11-01T20:50:17Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-11-01T23:22:31Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"TerminateInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"instanceId\":\"i-052b067f18ed43dc6\"}]}},\"responseElements\":{\"requestId\":\"a27ebda2-710b-424c-a851-bab31fcdbafc\",\"instancesSet\":{\"items\":[{\"instanceId\":\"i-052b067f18ed43dc6\",\"currentState\":{\"code\":48,\"name\":\"terminated\"},\"previousState\":{\"code\":80,\"name\":\"stopped\"}}]}},\"requestID\":\"a27ebda2-710b-424c-a851-bab31fcdbafc\",\"eventID\":\"f78ee8f7-2125-4528-bbf5-9492ee7eea5b\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "f78ee8f7-2125-4528-bbf5-9492ee7eea5b",
      "EventName": "TerminateInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-11-01T23:22:31.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "i-052b067f18ed43dc6",
          "ResourceType": "AWS::EC2::Instance"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFSVL5XMGM",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFSVL5XMGM\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-11-01T20:50:17Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-11-01T23:16:45Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"StopInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"instanceId\":\"i-052b067f18ed43dc6\"}]},\"force\":false},\"responseElements\":{\"requestId\":\"f505cfa8-8f5d-48ca-92ec-dab4f734bd13\",\"instancesSet\":{\"items\":[{\"instanceId\":\"i-052b067f18ed43dc6\",\"currentState\":{\"code\":64,\"name\":\"stopping\"},\"previousState\":{\"code\":16,\"name\":\"running\"}}]}},\"requestID\":\"f505cfa8-8f5d-48ca-92ec-dab4f734bd13\",\"eventID\":\"a4126128-76bf-49f4-b1a6-3e42c1e8e0a6\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "a4126128-76bf-49f4-b1a6-3e42c1e8e0a6",
      "EventName": "StopInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-11-01T23:16:45.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "i-052b067f18ed43dc6",
          "ResourceType": "AWS::EC2::Instance"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFSVL5XMGM",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFSVL5XMGM\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-11-01T20:50:17Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-11-01T21:03:08Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"RunInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"imageId\":\"ami-09d3b3274b6c5d4aa\",\"minCount\":1,\"maxCount\":1,\"keyName\":\"cloudryer_sandbox\"}]},\"instanceType\":\"t2.micro\",\"blockDeviceMapping\":{},\"monitoring\":{\"enabled\":false},\"disableApiTermination\":false,\"disableApiStop\":false,\"clientToken\":\"d48c7012-a9c9-475e-9c8c-e360eef7a71b\",\"networkInterfaceSet\":{\"items\":[{\"deviceIndex\":0,\"associatePublicIpAddress\":true,\"groupSet\":{\"items\":[{\"groupId\":\"sg-07f81935d1c6e7d34\"}]}}]},\"ebsOptimized\":false,\"tagSpecificationSet\":{\"items\":[{\"resourceType\":\"instance\",\"tags\":[{\"key\":\"Name\",\"value\":\"us1-t2\"}]}]},\"privateDnsNameOptions\":{\"hostnameType\":\"ip-name\",\"enableResourceNameDnsARecord\":true,\"enableResourceNameDnsAAAARecord\":false}},\"responseElements\":{\"requestId\":\"0e5ab872-4556-45ca-8e22-197b2c0f5bd6\",\"reservationId\":\"r-047cf27406627aff5\",\"ownerId\":\"450502852875\",\"groupSet\":{},\"instancesSet\":{\"items\":[{\"instanceId\":\"i-052b067f18ed43dc6\",\"imageId\":\"ami-09d3b3274b6c5d4aa\",\"currentInstanceBootMode\":\"bios\",\"instanceState\":{\"code\":0,\"name\":\"pending\"},\"privateDnsName\":\"ip-172-31-23-124.ec2.internal\",\"keyName\":\"cloudryer_sandbox\",\"amiLaunchIndex\":0,\"productCodes\":{},\"instanceType\":\"t2.micro\",\"launchTime\":1667336588000,\"placement\":{\"availabilityZone\":\"us-east-1a\",\"tenancy\":\"default\"},\"monitoring\":{\"state\":\"disabled\"},\"subnetId\":\"subnet-ff9ec5b2\",\"vpcId\":\"vpc-e9e14694\",\"privateIpAddress\":\"172.31.23.124\",\"stateReason\":{\"code\":\"pending\",\"message\":\"pending\"},\"architecture\":\"x86_64\",\"rootDeviceType\":\"ebs\",\"rootDeviceName\":\"/dev/xvda\",\"blockDeviceMapping\":{},\"virtualizationType\":\"hvm\",\"hypervisor\":\"xen\",\"tagSet\":{\"items\":[{\"key\":\"Name\",\"value\":\"us1-t2\"}]},\"clientToken\":\"d48c7012-a9c9-475e-9c8c-e360eef7a71b\",\"groupSet\":{\"items\":[{\"groupId\":\"sg-07f81935d1c6e7d34\",\"groupName\":\"launch-wizard-7\"}]},\"sourceDestCheck\":true,\"networkInterfaceSet\":{\"items\":[{\"networkInterfaceId\":\"eni-010f4efd9c1e25645\",\"subnetId\":\"subnet-ff9ec5b2\",\"vpcId\":\"vpc-e9e14694\",\"ownerId\":\"450502852875\",\"status\":\"in-use\",\"macAddress\":\"0a:a2:62:1e:4d:af\",\"privateIpAddress\":\"172.31.23.124\",\"privateDnsName\":\"ip-172-31-23-124.ec2.internal\",\"sourceDestCheck\":true,\"interfaceType\":\"interface\",\"groupSet\":{\"items\":[{\"groupId\":\"sg-07f81935d1c6e7d34\",\"groupName\":\"launch-wizard-7\"}]},\"attachment\":{\"attachmentId\":\"eni-attach-0e44011d25122e26b\",\"deviceIndex\":0,\"networkCardIndex\":0,\"status\":\"attaching\",\"attachTime\":1667336588000,\"deleteOnTermination\":true},\"privateIpAddressesSet\":{\"item\":[{\"privateIpAddress\":\"172.31.23.124\",\"privateDnsName\":\"ip-172-31-23-124.ec2.internal\",\"primary\":true}]},\"ipv6AddressesSet\":{},\"tagSet\":{}}]},\"ebsOptimized\":false,\"enaSupport\":true,\"cpuOptions\":{\"coreCount\":1,\"threadsPerCore\":1},\"capacityReservationSpecification\":{\"capacityReservationPreference\":\"open\"},\"enclaveOptions\":{\"enabled\":false},\"metadataOptions\":{\"state\":\"pending\",\"httpTokens\":\"optional\",\"httpPutResponseHopLimit\":1,\"httpEndpoint\":\"enabled\",\"httpProtocolIpv4\":\"enabled\",\"httpProtocolIpv6\":\"disabled\",\"instanceMetadataTags\":\"disabled\"},\"maintenanceOptions\":{\"autoRecovery\":\"default\"},\"privateDnsNameOptions\":{\"hostnameType\":\"ip-name\",\"enableResourceNameDnsARecord\":true,\"enableResourceNameDnsAAAARecord\":false}}]}},\"requestID\":\"0e5ab872-4556-45ca-8e22-197b2c0f5bd6\",\"eventID\":\"f82cfb35-40e3-4d91-8d63-e3e095f5db79\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "f82cfb35-40e3-4d91-8d63-e3e095f5db79",
      "EventName": "RunInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-11-01T21:03:08.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "vpc-e9e14694",
          "ResourceType": "AWS::EC2::VPC"
        },
        {
          "ResourceName": "ami-09d3b3274b6c5d4aa",
          "ResourceType": "AWS::EC2::Ami"
        },
        {
          "ResourceName": "eni-010f4efd9c1e25645",
          "ResourceType": "AWS::EC2::NetworkInterface"
        },
        {
          "ResourceName": "i-052b067f18ed43dc6",
          "ResourceType": "AWS::EC2::Instance"
        },
        {
          "ResourceName": "cloudryer_sandbox",
          "ResourceType": "AWS::EC2::KeyPair"
        },
        {
          "ResourceName": "sg-07f81935d1c6e7d34",
          "ResourceType": "AWS::EC2::SecurityGroup"
        },
        {
          "ResourceName": "launch-wizard-7",
          "ResourceType": "AWS::EC2::SecurityGroup"
        },
        {
          "ResourceName": "subnet-ff9ec5b2",
          "ResourceType": "AWS::EC2::Subnet"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFYU56NMU5",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFYU56NMU5\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-10-28T17:08:05Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-10-28T23:07:50Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"TerminateInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"instanceId\":\"i-0f3fbbbc0298d1a86\"},{\"instanceId\":\"i-075ea41997e5fd321\"}]}},\"responseElements\":{\"requestId\":\"a5dd7003-59bf-4bb6-8ef4-e2dc106080f3\",\"instancesSet\":{\"items\":[{\"instanceId\":\"i-075ea41997e5fd321\",\"currentState\":{\"code\":48,\"name\":\"terminated\"},\"previousState\":{\"code\":80,\"name\":\"stopped\"}},{\"instanceId\":\"i-0f3fbbbc0298d1a86\",\"currentState\":{\"code\":32,\"name\":\"shutting-down\"},\"previousState\":{\"code\":16,\"name\":\"running\"}}]}},\"requestID\":\"a5dd7003-59bf-4bb6-8ef4-e2dc106080f3\",\"eventID\":\"35d0171a-d5aa-441e-975a-9f23af8720cf\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "35d0171a-d5aa-441e-975a-9f23af8720cf",
      "EventName": "TerminateInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-10-28T23:07:50.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "i-075ea41997e5fd321",
          "ResourceType": "AWS::EC2::Instance"
        },
        {
          "ResourceName": "i-0f3fbbbc0298d1a86",
          "ResourceType": "AWS::EC2::Instance"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFYU56NMU5",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFYU56NMU5\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-10-28T17:08:05Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-10-28T21:19:39Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"StopInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"instanceId\":\"i-075ea41997e5fd321\"}]},\"force\":false},\"responseElements\":{\"requestId\":\"659bd06e-d27b-4f76-87ea-efc1888474ee\",\"instancesSet\":{\"items\":[{\"instanceId\":\"i-075ea41997e5fd321\",\"currentState\":{\"code\":64,\"name\":\"stopping\"},\"previousState\":{\"code\":16,\"name\":\"running\"}}]}},\"requestID\":\"659bd06e-d27b-4f76-87ea-efc1888474ee\",\"eventID\":\"6ae594d6-756e-4445-a5af-899b746581fa\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "6ae594d6-756e-4445-a5af-899b746581fa",
      "EventName": "StopInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-10-28T21:19:39.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "i-075ea41997e5fd321",
          "ResourceType": "AWS::EC2::Instance"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFYU56NMU5",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFYU56NMU5\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-10-28T17:08:05Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-10-28T19:35:09Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"RunInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"imageId\":\"ami-04040ffc903b722df\",\"minCount\":1,\"maxCount\":1,\"keyName\":\"cloudryer_sandbox\"}]},\"instanceType\":\"m5.large\",\"blockDeviceMapping\":{},\"monitoring\":{\"enabled\":false},\"disableApiTermination\":false,\"disableApiStop\":false,\"networkInterfaceSet\":{\"items\":[{\"deviceIndex\":0,\"associatePublicIpAddress\":true,\"groupSet\":{\"items\":[{\"groupId\":\"sg-04bd74569fe50fdb5\"}]}}]},\"ebsOptimized\":true,\"tagSpecificationSet\":{\"items\":[{\"resourceType\":\"instance\",\"tags\":[{\"key\":\"Name\",\"value\":\"dedicated_windows_with_sql\"}]}]},\"privateDnsNameOptions\":{\"hostnameType\":\"ip-name\",\"enableResourceNameDnsARecord\":true,\"enableResourceNameDnsAAAARecord\":false}},\"responseElements\":{\"requestId\":\"6a66afbb-f9a5-4f4e-a652-f63380f406b2\",\"reservationId\":\"r-05dd65c8b7ccda097\",\"ownerId\":\"450502852875\",\"groupSet\":{},\"instancesSet\":{\"items\":[{\"instanceId\":\"i-075ea41997e5fd321\",\"imageId\":\"ami-04040ffc903b722df\",\"currentInstanceBootMode\":\"bios\",\"instanceState\":{\"code\":0,\"name\":\"pending\"},\"privateDnsName\":\"ip-172-31-76-59.ec2.internal\",\"keyName\":\"cloudryer_sandbox\",\"amiLaunchIndex\":0,\"productCodes\":{},\"instanceType\":\"m5.large\",\"launchTime\":1666985709000,\"placement\":{\"availabilityZone\":\"us-east-1f\",\"tenancy\":\"default\"},\"platform\":\"windows\",\"monitoring\":{\"state\":\"disabled\"},\"subnetId\":\"subnet-858bc68b\",\"vpcId\":\"vpc-e9e14694\",\"privateIpAddress\":\"172.31.76.59\",\"stateReason\":{\"code\":\"pending\",\"message\":\"pending\"},\"architecture\":\"x86_64\",\"rootDeviceType\":\"ebs\",\"rootDeviceName\":\"/dev/sda1\",\"blockDeviceMapping\":{},\"virtualizationType\":\"hvm\",\"hypervisor\":\"xen\",\"tagSet\":{\"items\":[{\"key\":\"Name\",\"value\":\"dedicated_windows_with_sql\"}]},\"groupSet\":{\"items\":[{\"groupId\":\"sg-04bd74569fe50fdb5\",\"groupName\":\"launch-wizard-1\"}]},\"sourceDestCheck\":true,\"networkInterfaceSet\":{\"items\":[{\"networkInterfaceId\":\"eni-0ee8a52bd5c8a75d8\",\"subnetId\":\"subnet-858bc68b\",\"vpcId\":\"vpc-e9e14694\",\"ownerId\":\"450502852875\",\"status\":\"in-use\",\"macAddress\":\"16:ae:af:6d:36:d9\",\"privateIpAddress\":\"172.31.76.59\",\"privateDnsName\":\"ip-172-31-76-59.ec2.internal\",\"sourceDestCheck\":true,\"interfaceType\":\"interface\",\"groupSet\":{\"items\":[{\"groupId\":\"sg-04bd74569fe50fdb5\",\"groupName\":\"launch-wizard-1\"}]},\"attachment\":{\"attachmentId\":\"eni-attach-0961263e2dd6a78b0\",\"deviceIndex\":0,\"networkCardIndex\":0,\"status\":\"attaching\",\"attachTime\":1666985708000,\"deleteOnTermination\":true},\"privateIpAddressesSet\":{\"item\":[{\"privateIpAddress\":\"172.31.76.59\",\"privateDnsName\":\"ip-172-31-76-59.ec2.internal\",\"primary\":true}]},\"ipv6AddressesSet\":{},\"tagSet\":{}}]},\"ebsOptimized\":true,\"enaSupport\":true,\"cpuOptions\":{\"coreCount\":1,\"threadsPerCore\":2},\"capacityReservationSpecification\":{\"capacityReservationPreference\":\"open\"},\"enclaveOptions\":{\"enabled\":false},\"metadataOptions\":{\"state\":\"pending\",\"httpTokens\":\"optional\",\"httpPutResponseHopLimit\":1,\"httpEndpoint\":\"enabled\",\"httpProtocolIpv4\":\"enabled\",\"httpProtocolIpv6\":\"disabled\",\"instanceMetadataTags\":\"disabled\"},\"maintenanceOptions\":{\"autoRecovery\":\"default\"},\"privateDnsNameOptions\":{\"hostnameType\":\"ip-name\",\"enableResourceNameDnsARecord\":true,\"enableResourceNameDnsAAAARecord\":false}}]}},\"requestID\":\"6a66afbb-f9a5-4f4e-a652-f63380f406b2\",\"eventID\":\"14a7a874-7bfd-48c4-86d3-0c03b764ec41\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "14a7a874-7bfd-48c4-86d3-0c03b764ec41",
      "EventName": "RunInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-10-28T19:35:09.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "vpc-e9e14694",
          "ResourceType": "AWS::EC2::VPC"
        },
        {
          "ResourceName": "ami-04040ffc903b722df",
          "ResourceType": "AWS::EC2::Ami"
        },
        {
          "ResourceName": "eni-0ee8a52bd5c8a75d8",
          "ResourceType": "AWS::EC2::NetworkInterface"
        },
        {
          "ResourceName": "i-075ea41997e5fd321",
          "ResourceType": "AWS::EC2::Instance"
        },
        {
          "ResourceName": "cloudryer_sandbox",
          "ResourceType": "AWS::EC2::KeyPair"
        },
        {
          "ResourceName": "sg-04bd74569fe50fdb5",
          "ResourceType": "AWS::EC2::SecurityGroup"
        },
        {
          "ResourceName": "launch-wizard-1",
          "ResourceType": "AWS::EC2::SecurityGroup"
        },
        {
          "ResourceName": "subnet-858bc68b",
          "ResourceType": "AWS::EC2::Subnet"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFYU56NMU5",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFYU56NMU5\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-10-28T17:08:05Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-10-28T18:55:11Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"AttachNetworkInterface\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"networkInterfaceId\":\"eni-0a9c4b60624c0e41d\",\"instanceId\":\"i-0f3fbbbc0298d1a86\",\"deviceIndex\":1},\"responseElements\":{\"requestId\":\"669c37c4-d0af-4e71-8169-254fe73820f5\",\"attachmentId\":\"eni-attach-00eb752237a160808\"},\"requestID\":\"669c37c4-d0af-4e71-8169-254fe73820f5\",\"eventID\":\"3251aba1-4740-49d5-b700-f3115ef0a9ee\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "3251aba1-4740-49d5-b700-f3115ef0a9ee",
      "EventName": "AttachNetworkInterface",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-10-28T18:55:11.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "eni-attach-00eb752237a160808",
          "ResourceType": "AWS::EC2::NetworkInterfaceAttachment"
        },
        {
          "ResourceName": "eni-0a9c4b60624c0e41d",
          "ResourceType": "AWS::EC2::NetworkInterface"
        },
        {
          "ResourceName": "i-0f3fbbbc0298d1a86",
          "ResourceType": "AWS::EC2::Instance"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFYU56NMU5",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFYU56NMU5\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-10-28T17:08:05Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-10-28T18:08:02Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"StartInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"instanceId\":\"i-0f3fbbbc0298d1a86\"}]}},\"responseElements\":{\"requestId\":\"15170ecf-120c-4912-b10f-494a069f0ac5\",\"instancesSet\":{\"items\":[{\"instanceId\":\"i-0f3fbbbc0298d1a86\",\"currentState\":{\"code\":0,\"name\":\"pending\"},\"previousState\":{\"code\":80,\"name\":\"stopped\"}}]}},\"requestID\":\"15170ecf-120c-4912-b10f-494a069f0ac5\",\"eventID\":\"b30c8975-a223-442f-b22e-8bfc02ca86b5\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "b30c8975-a223-442f-b22e-8bfc02ca86b5",
      "EventName": "StartInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-10-28T18:08:02.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "i-0f3fbbbc0298d1a86",
          "ResourceType": "AWS::EC2::Instance"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFYU56NMU5",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"Root\",\"principalId\":\"450502852875\",\"arn\":\"arn:aws:iam::450502852875:root\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFYU56NMU5\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-10-28T17:08:05Z\",\"mfaAuthenticated\":\"true\"}}},\"eventTime\":\"2022-10-28T17:55:55Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"StopInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"instanceId\":\"i-0f3fbbbc0298d1a86\"}]},\"force\":false},\"responseElements\":{\"requestId\":\"cd08e292-4f90-45f9-8f22-9470b2b9aa61\",\"instancesSet\":{\"items\":[{\"instanceId\":\"i-0f3fbbbc0298d1a86\",\"currentState\":{\"code\":64,\"name\":\"stopping\"},\"previousState\":{\"code\":16,\"name\":\"running\"}}]}},\"requestID\":\"cd08e292-4f90-45f9-8f22-9470b2b9aa61\",\"eventID\":\"178442b7-aed3-4c94-9758-0504e8a7f8ce\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "178442b7-aed3-4c94-9758-0504e8a7f8ce",
      "EventName": "StopInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-10-28T17:55:55.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "i-0f3fbbbc0298d1a86",
          "ResourceType": "AWS::EC2::Instance"
        }
      ],
      "Username": "root"
    },
    {
      "AccessKeyId": "ASIAWRZAQAEFSWHVF7DB",
      "CloudTrailEvent": "{\"eventVersion\":\"1.08\",\"userIdentity\":{\"type\":\"IAMUser\",\"principalId\":\"AIDAWRZAQAEFRQCTRCKYJ\",\"arn\":\"arn:aws:iam::450502852875:user/ziv\",\"accountId\":\"450502852875\",\"accessKeyId\":\"ASIAWRZAQAEFSWHVF7DB\",\"userName\":\"ziv\",\"sessionContext\":{\"sessionIssuer\":{},\"webIdFederationData\":{},\"attributes\":{\"creationDate\":\"2022-10-27T04:23:02Z\",\"mfaAuthenticated\":\"false\"}}},\"eventTime\":\"2022-10-27T06:47:08Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"RunInstances\",\"awsRegion\":\"us-east-1\",\"sourceIPAddress\":\"AWS Internal\",\"userAgent\":\"AWS Internal\",\"requestParameters\":{\"instancesSet\":{\"items\":[{\"imageId\":\"ami-09d3b3274b6c5d4aa\",\"minCount\":1,\"maxCount\":1,\"keyName\":\"cloudryer_sandbox\"}]},\"instanceType\":\"t2.micro\",\"blockDeviceMapping\":{},\"monitoring\":{\"enabled\":false},\"disableApiTermination\":false,\"disableApiStop\":false,\"networkInterfaceSet\":{\"items\":[{\"deviceIndex\":0,\"associatePublicIpAddress\":true,\"groupSet\":{\"items\":[{\"groupId\":\"sg-04bd74569fe50fdb5\"}]}}]},\"ebsOptimized\":false,\"tagSpecificationSet\":{\"items\":[{\"resourceType\":\"instance\",\"tags\":[{\"key\":\"Name\",\"value\":\"simple_t2\"}]}]},\"privateDnsNameOptions\":{\"hostnameType\":\"ip-name\",\"enableResourceNameDnsARecord\":true,\"enableResourceNameDnsAAAARecord\":false}},\"responseElements\":{\"requestId\":\"993e491c-a876-4276-a2e7-cd36b09a6599\",\"reservationId\":\"r-0df2d8d33d4f1d21b\",\"ownerId\":\"450502852875\",\"groupSet\":{},\"instancesSet\":{\"items\":[{\"instanceId\":\"i-0f3fbbbc0298d1a86\",\"imageId\":\"ami-09d3b3274b6c5d4aa\",\"currentInstanceBootMode\":\"bios\",\"instanceState\":{\"code\":0,\"name\":\"pending\"},\"privateDnsName\":\"ip-172-31-92-239.ec2.internal\",\"keyName\":\"cloudryer_sandbox\",\"amiLaunchIndex\":0,\"productCodes\":{},\"instanceType\":\"t2.micro\",\"launchTime\":1666853227000,\"placement\":{\"availabilityZone\":\"us-east-1d\",\"tenancy\":\"default\"},\"monitoring\":{\"state\":\"disabled\"},\"subnetId\":\"subnet-3d4cda1c\",\"vpcId\":\"vpc-e9e14694\",\"privateIpAddress\":\"172.31.92.239\",\"stateReason\":{\"code\":\"pending\",\"message\":\"pending\"},\"architecture\":\"x86_64\",\"rootDeviceType\":\"ebs\",\"rootDeviceName\":\"/dev/xvda\",\"blockDeviceMapping\":{},\"virtualizationType\":\"hvm\",\"hypervisor\":\"xen\",\"tagSet\":{\"items\":[{\"key\":\"Name\",\"value\":\"simple_t2\"}]},\"groupSet\":{\"items\":[{\"groupId\":\"sg-04bd74569fe50fdb5\",\"groupName\":\"launch-wizard-1\"}]},\"sourceDestCheck\":true,\"networkInterfaceSet\":{\"items\":[{\"networkInterfaceId\":\"eni-0de5f5ec51b747a14\",\"subnetId\":\"subnet-3d4cda1c\",\"vpcId\":\"vpc-e9e14694\",\"ownerId\":\"450502852875\",\"status\":\"in-use\",\"macAddress\":\"12:0c:18:34:aa:79\",\"privateIpAddress\":\"172.31.92.239\",\"privateDnsName\":\"ip-172-31-92-239.ec2.internal\",\"sourceDestCheck\":true,\"interfaceType\":\"interface\",\"groupSet\":{\"items\":[{\"groupId\":\"sg-04bd74569fe50fdb5\",\"groupName\":\"launch-wizard-1\"}]},\"attachment\":{\"attachmentId\":\"eni-attach-0a83382fa239e1cb4\",\"deviceIndex\":0,\"networkCardIndex\":0,\"status\":\"attaching\",\"attachTime\":1666853227000,\"deleteOnTermination\":true},\"privateIpAddressesSet\":{\"item\":[{\"privateIpAddress\":\"172.31.92.239\",\"privateDnsName\":\"ip-172-31-92-239.ec2.internal\",\"primary\":true}]},\"ipv6AddressesSet\":{},\"tagSet\":{}}]},\"ebsOptimized\":false,\"enaSupport\":true,\"cpuOptions\":{\"coreCount\":1,\"threadsPerCore\":1},\"capacityReservationSpecification\":{\"capacityReservationPreference\":\"open\"},\"enclaveOptions\":{\"enabled\":false},\"metadataOptions\":{\"state\":\"pending\",\"httpTokens\":\"optional\",\"httpPutResponseHopLimit\":1,\"httpEndpoint\":\"enabled\",\"httpProtocolIpv4\":\"enabled\",\"httpProtocolIpv6\":\"disabled\",\"instanceMetadataTags\":\"disabled\"},\"maintenanceOptions\":{\"autoRecovery\":\"default\"},\"privateDnsNameOptions\":{\"hostnameType\":\"ip-name\",\"enableResourceNameDnsARecord\":true,\"enableResourceNameDnsAAAARecord\":false}}]}},\"requestID\":\"993e491c-a876-4276-a2e7-cd36b09a6599\",\"eventID\":\"ed20b628-72ef-4412-8ca5-9a508b049465\",\"readOnly\":false,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"450502852875\",\"eventCategory\":\"Management\",\"sessionCredentialFromConsole\":\"true\"}",
      "EventId": "ed20b628-72ef-4412-8ca5-9a508b049465",
      "EventName": "RunInstances",
      "EventSource": "ec2.amazonaws.com",
      "EventTime": "2022-10-27T06:47:08.000Z",
      "ReadOnly": "false",
      "Resources": [
        {
          "ResourceName": "vpc-e9e14694",
          "ResourceType": "AWS::EC2::VPC"
        },
        {
          "ResourceName": "ami-09d3b3274b6c5d4aa",
          "ResourceType": "AWS::EC2::Ami"
        },
        {
          "ResourceName": "eni-0de5f5ec51b747a14",
          "ResourceType": "AWS::EC2::NetworkInterface"
        },
        {
          "ResourceName": "i-0f3fbbbc0298d1a86",
          "ResourceType": "AWS::EC2::Instance"
        },
        {
          "ResourceName": "cloudryer_sandbox",
          "ResourceType": "AWS::EC2::KeyPair"
        },
        {
          "ResourceName": "sg-04bd74569fe50fdb5",
          "ResourceType": "AWS::EC2::SecurityGroup"
        },
        {
          "ResourceName": "launch-wizard-1",
          "ResourceType": "AWS::EC2::SecurityGroup"
        },
        {
          "ResourceName": "subnet-3d4cda1c",
          "ResourceType": "AWS::EC2::Subnet"
        }
      ],
      "Username": "ziv"
    }
  ]
};

// this is just a hack to resolve ESM loaidng issues
jest.unstable_mockModule('../../../utils/printingUtils.js', () => {
  return {
    printUpdate: jest.fn()
  };
});

jest.unstable_mockModule('@aws-sdk/client-cloudtrail', () => {
  return {
    LookupEventsCommand: jest.fn(),
    CloudTrailClient: jest.fn().mockImplementation(() => {
      return {
        send: jest.fn().mockImplementation(() => {
          return responsePayload
        })
      };
    })
  };
});

describe('CloudTrailClient', () => {
  it('should return the correct response', async () => {
    const {lookUpInstancesEvents} = (await import('../cloudTrailClient.js'));
    const {instancesEvents, instancesInfo} = await lookUpInstancesEvents(['us-east-1']);
    const expectedInstances = ['i-08b3f8f7dcc08d7e4', 'i-0f3fbbbc0298d1a86','i-075ea41997e5fd321','i-052b067f18ed43dc6'];
    expect(Object.keys(instancesInfo).sort()).toEqual(expectedInstances.sort());
    expect(Object.keys(instancesEvents).sort()).toEqual(expectedInstances.sort());

    const instanceInfo = instancesInfo['i-0f3fbbbc0298d1a86'];
    expect(instanceInfo).toEqual({
      [Machine.InstanceID]: 'i-0f3fbbbc0298d1a86',
      [Machine.InstanceType]: 't2.micro',
      [Machine.OperatingSystem]: OperatingSystems.Linux,
      [Resource.Region]: 'us-east-1',
      [Resource.CreationDate]: new Date('2022-10-27T06:47:07.000Z').toISOString(),
      [Resource.Creator]: 'ziv',
      [Machine.State]: States.Terminated
    });

    const instanceEvents = instancesEvents['i-0f3fbbbc0298d1a86'];
    expect(instanceEvents.length).toEqual(5);


  });
});