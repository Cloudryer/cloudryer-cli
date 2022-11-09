const Resource = {
  Region: "Region",
  CreationDate: "CreationDate",
  TerminationDate: "TerminationDate",
  Creator: "Creator",
  Tags: "Tags",
}

const States = {
  Running: "Running",
  Stopped: "Stopped",
  Terminated: "Terminated",
  Starting: "Starting",
}

const Machine = {
  State: "State",
  InstanceID: "InstanceID",
  InstanceType: "InstanceType",
  OperatingSystem: "OperatingSystem",
}

const OperatingSystems = {
  Linux: "Linux",
  Windows: "Windows",
}

const Metrics = {
  CPU: "CPU",
  NetworkPacketsIn: "NetworkPacketsIn",
  NetworkPacketsOut: "NetworkPacketsOut",
  NetworkPacketsInOut: "NetworkPacketsInOut",
  DiskReadOps: "DiskReadOps",
  DiskWriteOps: "DiskWriteOps",
  DiskReadWriteOps: "DiskReadWriteOps",
  UpTime: "UpTime",
  Utilization: "Utilization",
}

const Waste = {
  TotalWaste: "TotalWaste",
  IdlePct: "IdlePct",
  EvalPeriod: "EvalPeriod"
}

const Cost = {
  TotalCost: "TotalCost",
  CostPerHour: "CostPerHour"
}

module.exports = {States, Machine, Metrics, Waste,Cost, Resource,OperatingSystems};