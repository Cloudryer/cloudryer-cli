const {Table} = require('console-table-printer');
const chalk = require('chalk');
const {Machine, States,Resource, Waste, Metrics,Cost} = require('../models/metadata');


const charLength = {'⚡': 2, '✅': 2, '🛑': 2, '🪦': 2};


const columnsDefinition = {
  baseColumns: [
    {name: Resource.Region, alignment: 'left'},
    {name: Machine.State, title: 'State', alignment: 'left'},
    {name: Machine.InstanceID, title: 'Instance ID', alignment: 'left'}, // column coloring
    {name: Machine.InstanceType, title: 'Instance Type', alignment: 'left', maxLen: 11},
    {name: Metrics.UpTime, title: 'Total Running Time (hrs)', alignment: 'left',maxLen: 13},
  ],
  utilizationColumns: [
    {name: Metrics.CPU, title: 'CPU', alignment: 'left'}, // column coloring
    {name: Metrics.NetworkPacketsInOut, title: 'Network Usage (packets/sec)', alignment: 'left', maxLen: 7}, // column coloring
    {name: Metrics.DiskReadWriteOps, title: 'Disk Usage (ops/sec)', alignment: 'left', maxLen: 7}, // column coloring
  ],
  wasteColumns: [
    {name: Cost.TotalCost, title: 'Total Cost $', alignment: 'left', maxLen: 7},
    {name: Waste.TotalWaste, title: `Waste $`, alignment: 'left', maxLen: 7}, // column coloring
    {name: Waste.IdlePct, title: '% Idle', alignment: 'left', maxLen: 6}

  ]
}

const stateRenderer = {
  [States.Running]: {text: '✅ running'},
  [States.Stopped]: {text: '🛑 stopped'},
  [States.Terminated]: {text: `🪦 ${chalk.gray('terminated')}`},
  [States.Starting]: {text: '⚡ starting'}
};

const createTable = function ({hideUtilization, calculateWaste}) {
  let columns = [...columnsDefinition.baseColumns];
  columns = !hideUtilization ? [...columns, ...columnsDefinition.utilizationColumns] : columns;
  columns = calculateWaste ? [...columns, ...columnsDefinition.wasteColumns] : columns;
  return new Table({columns, charLength});
};


const printMachines = function (machinesData, {hideUtilization, calculateWaste, evaluationPeriod}) {
  const p = createTable({hideUtilization, calculateWaste, evaluationPeriod});

  machinesData.forEach((machine) => {
    let renderedMachine = {
      [Machine.InstanceType]: machine[Machine.InstanceType],
      [Resource.Region]: machine[Resource.Region],

    };

    let state = machine[Machine.State];
    let instanceId = machine[Machine.InstanceID];
    renderedMachine[Machine.State] = stateRenderer[state].text;
    renderedMachine[Machine.InstanceID] = state === States.Terminated ? chalk.gray(instanceId) : instanceId;
    renderedMachine[Metrics.UpTime] = `${machine[Metrics.UpTime]} hrs`;

    if (!hideUtilization) {
      let cpu = Math.floor(machine[Metrics.CPU]);
      let disk = machine[Metrics.DiskReadWriteOps];
      let network = machine[Metrics.NetworkPacketsInOut];

      if (state === States.Running) {
        renderedMachine[Metrics.CPU] = `${cpu}%`;
        renderedMachine[Metrics.DiskReadWriteOps] = `${disk} IO/s`;
        renderedMachine[Metrics.NetworkPacketsInOut] = `${network} MB/s`

      }
    }
    if (calculateWaste) {
      let totalWaste = Math.floor(machine[Waste.TotalWaste]*100)/100;
      renderedMachine[Waste.TotalWaste] = `$ ${totalWaste}`;
      let totalCost = Math.floor(machine[Cost.TotalCost]*100)/100;
      renderedMachine[Cost.TotalCost] = `$ ${totalCost}`;
      renderedMachine[Waste.IdlePct] = machine[Waste.IdlePct];

    }
    p.addRow(renderedMachine);
  });

  p.printTable();

};

const printSummary = function (machinesData, {evaluationPeriod}) {
  let aggregatedWaste = machinesData.map((machine) => machine[Waste.TotalWaste]).reduce((acc, curr) => acc + curr, 0);
  aggregatedWaste = Math.floor(aggregatedWaste*100)/100;
  console.log(chalk.yellowBright(`Over the last ${evaluationPeriod} days, you could have saved $${aggregatedWaste} 💰💰💰🤑🤑🤑`));
};

module.exports = {printMachines, printSummary}
//
// const data = [
//   {
//     "Region": "us-east-1",
//     "InstanceID": "i-08b3f8f7dcc08d7e4",
//     "InstanceType": "t2.micro",
//     "State": "Running",
//     "CreationDate": "2022-11-07T18:26:28.000Z",
//     "OperatingSystem": "Linux",
//     "awsInfo": {
//       "launchTime": "2022-11-07T18:26:28.000Z",
//       "imageId": "ami-09d3b3274b6c5d4aa",
//       "tags": [
//         {
//           "Key": "Name",
//           "Value": "testing"
//         }
//       ],
//       "architecture": "x86_64",
//       "platformDetails": "Linux/UNIX",
//       "stateTransitionReason": "",
//       "usageOperationUpdateTime": "2022-11-07T18:26:28.000Z"
//     },
//     "firstTimeNetworkInterfacedAttached": "2022-11-07T18:26:28.000Z",
//     "EvalPeriod": "13",
//     "Creator": "unknown",
//     "CPU": 13.5593220338983,
//     "DiskReadWriteOps": 0,
//     "NetworkPacketsInOut": 886,
//     "UpTime": 37,
//     "TotalCost": 0.42919999999999997,
//     "TotalWaste": 0.42919999999999997,
//     "IdlePct": "100%"
//   }
// ];
//
// printMachines(data, {hideUtilization: false, calculateWaste: true, evaluationPeriod: 13});
// printSummary(data, {evaluationPeriod: 13});