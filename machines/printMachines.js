import {Table} from 'console-table-printer';
import chalk from 'chalk';
import {Machine, States,Resource, Waste, Metrics,Cost} from '../models/metadata.js';


const charLength = {'⚡': 2, '✅': 2, '🛑': 2, '🪦': 2};


const columnsDefinition = {
  baseColumns: [
    {name: Resource.Region, alignment: 'left'},
    {name: Machine.State, title: 'State', alignment: 'left'},
    {name: Machine.InstanceID, title: 'Instance ID', alignment: 'left'}, // column coloring
    {name: Machine.InstanceType, title: 'Instance Type', alignment: 'left', maxLen: 11},
    {name: Metrics.UpTime, title: 'Total Running Time (hrs)', alignment: 'left',maxLen: 13},
    {name: Resource.Creator, title: 'Owner', alignment: 'left',maxLen: 13},
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
      [Resource.Creator]: machine[Resource.Creator],

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

export {printMachines, printSummary};
