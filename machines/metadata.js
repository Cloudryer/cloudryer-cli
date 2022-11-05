const States = {
  Running: "running",
  Stopped: "stopped",
  Terminated: "terminated",
  Starting: "starting"
}

const Machine = {
  State: "state",
  InstanceID: "instanceId",
  InstanceType: "instanceType",
  Creator: "creator",

}

const Metrics = {
  CPU: "cpu",
  NetworkPacketsIn: "networkPacketsIn",
  NetworkPacketsOut: "networkPacketsOut",
  NetworkPacketsInOut: "network",
  DiskReadOps: "diskReadOps",
  DiskWriteOps: "diskWriteOps",
  DiskReadWriteOps: "diskReadWriteOps",
  UpTime: "upTime"
}

const Waste = {
  TotalWaste: "totalWaste",
  IdlePct: "idlePct",
  EvalPeriod: "evalPeriod"
}

const Cost = {
  TotalCost: "totalCost"
}

module.exports = {States, Machine, Metrics, Waste,Cost};