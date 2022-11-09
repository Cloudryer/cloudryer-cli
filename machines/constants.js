const States = {
  Running: "running",
  Stopped: "stopped",
  Terminated: "terminated",
  Starting: "starting"
}

const MachineProperties = {
  State: "state",
  InstanceID: "instanceId",
  MachineType: "machineType",
  CPU: "cpu",
  Network: "network",
  Disk: "disk",
}

module.exports = {States,MachineProperties};