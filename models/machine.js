class Machine {
  constructor({instanceId, instanceType, region, availabilityZone, startTime, endTime, creator, evalPeriodDays, cpu, diskReadWriteOps, networkPacketsInOut, waste}) {
    this.instanceId = instanceId;
    this.instanceType = instanceType;
    this.region = region;
    this.availabilityZone = availabilityZone;
    this.startTime = startTime;
    this.endTime = endTime;
    this.creator = creator;
    this.evalPeriodDays = evalPeriodDays;
    this.cpu = cpu;
    this.diskReadWriteOps = diskReadWriteOps;
    this.networkPacketsInOut = networkPacketsInOut;
    this.waste = waste;
  }





}
