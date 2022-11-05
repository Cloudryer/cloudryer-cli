const {States,Metrics,Waste,Machine} = require('../machines/metadata');

const genRanInstanceId = function () {
  const randomHexString = [...Array(17)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  return `i-${randomHexString}`;
};

const machineTypes = ["c1.medium", "c1.xlarge", "c3.2xlarge", "c3.4xlarge", "c3.8xlarge", "c3.large", "c3.xlarge", "cc2.8xlarge", "cg1.4xlarge", "cr1.8xlarge", "g2.2xlarge", "hi1.4xlarge", "hs1.8xlarge", "i2.2xlarge", "i2.4xlarge", "i2.8xlarge", "i2.xlarge", "m1.large", "m1.medium", "m1.small", "m1.xlarge", "m2.2xlarge", "m2.4xlarge", "m2.xlarge", "m3.2xlarge", "m3.large", "m3.medium", "m3.xlarge", "r3.2xlarge", "r3.4xlarge", "r3.8xlarge", "r3.large", "r3.xlarge", "t1.micro", "t2.medium", "t2.micro", "t2.small"];

const generateFakedData = function ({fetchUtilization, calculateWaste, evalPeriod}) {
  const states = Object.values(States);
  const data = [];
  for (let i = 1; i <= 10; i++) {
    let state = states[Math.floor(Math.random() * states.length)];
    let instanceId = genRanInstanceId();
    let machineType = machineTypes[Math.floor(Math.random() * machineTypes.length)];
    let cpuPct, diskIOsec, networkMBsec;
    let wastePerPeriod, timePctNotUtilized, totalWaste;
    if (fetchUtilization) {
      cpuPct = 0;
      diskIOsec = 0;
      networkMBsec = 0;
      if (state == States.Running) {
        cpuPct = Math.floor(Math.random() * 100);
        diskIOsec = Math.floor(Math.random() * 100);
        networkMBsec = Math.floor(Math.random() * 100);
      }
    }
    if (calculateWaste) {
      wastePerPeriod = Math.floor(Math.random() * 100);
      totalWaste = Math.min(Math.floor(Math.random() * 10),wastePerPeriod);
      timePctNotUtilized = Math.floor(Math.random() * 50);
    }

    data.push({
      [Machine.InstanceID]:instanceId,
      [Machine.State]:state,
      [Machine.MachineType]:machineType,
      [Metrics.CPU]:cpuPct,
      [Metrics.Disk]:diskIOsec,
      [Metrics.Network]:networkMBsec,
      [Waste.WastePerPeriod]:wastePerPeriod,
      [Waste.TotalWaste]:totalWaste,
      [Waste.IdlePct]:timePctNotUtilized,
      [Waste.EvalPeriod]:evalPeriod
    });
  }
  return data;
}

module.exports = generateFakedData;