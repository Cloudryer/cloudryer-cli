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

const AuditEventTypes = {
  CreateMachine: "CreateMachine",
  StopMachine: "StopMachine",
  StartMachine: "StartMachine",
  TerminateMachine: "TerminateMachine",
  Other: "Other",
}

const AuditEvent = {
  Type: "Type",
  Date: "Date",
  Username: "Username",

}

const Machine = {
  State: "State",
  InstanceID: "InstanceID",
  InstanceType: "InstanceType",
  OperatingSystem: "OperatingSystem",
  KeyName: "KeyName",

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

const Lifecycle = {
  DaysSinceLastUtilization: "DaysSinceLastUtilization",
  DaysSinceLastStateChange: "DaysSinceLastStateChange",
  DaysSinceCreation: "DaysSinceCreation",
  LastUtilizationDate: "LastUtilizationDate",
  LastStateChangeDate: "LastStateChangeDate",

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

export {States, Machine, Metrics, Waste,Cost, Resource,OperatingSystems,AuditEvent,AuditEventTypes,Lifecycle};