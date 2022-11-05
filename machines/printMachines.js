const {Table} = require('console-table-printer');
const chalk = require('chalk');
const {Machine, States, Waste, Metrics} = require('./metadata');


const charLength = {'⚡': 2, '✅': 2, '🛑': 2, '🪦': 2};

const TABLE_FIELDS_MAP = {
  [Machine.State]: 'renderedState',
  [Machine.InstanceID]: 'renderedInstanceId',
  [Machine.MachineType]: 'renderedMachineType',
  [Metrics.CPU]: 'renderedCpu',
  [Metrics.Network]: 'renderedNetwork',
  [Metrics.Disk]: 'renderedDisk',
  [Metrics.UpTime]: 'renderedUpTime',
  [Waste.IdlePct]: 'renderedIdlePct',
  [Waste.TotalWaste]: 'renderedTotalWaste',
  [Waste.WastePerPeriod]: 'renderedWastePerPeriod'
}

const columnsDefinition = {
  baseColumns: [
    {name: TABLE_FIELDS_MAP[Machine.State], title: 'State', alignment: 'left'},
    {name: TABLE_FIELDS_MAP[Machine.InstanceID], title: 'Instance ID', alignment: 'left'}, // column coloring
    {name: TABLE_FIELDS_MAP[Machine.MachineType], title: 'Machine Type', alignment: 'left'},
  ],
  utilizationColumns: [
    {name: TABLE_FIELDS_MAP[Metrics.CPU], title: 'CPU', alignment: 'left'}, // column coloring
    {name: TABLE_FIELDS_MAP[Metrics.Network], title: 'Network Usage', alignment: 'left', maxLen: 7}, // column coloring
    {name: TABLE_FIELDS_MAP[Metrics.Disk], title: 'Disk Usage', alignment: 'left', maxLen: 7}, // column coloring
  ],
  wasteColumns: [
    {name: TABLE_FIELDS_MAP[Waste.WastePerPeriod], title: `Waste $/period`, alignment: 'left', maxLen: 5}, // column coloring
    {name: TABLE_FIELDS_MAP[Waste.TotalWaste], title: 'Total Waste $', alignment: 'left', maxLen: 7},
    {name: TABLE_FIELDS_MAP[Waste.IdlePct], title: '% Idle', alignment: 'left', maxLen: 6},
  ]
}

const stateRenderer = {
  [States.Running]: {text: '✅ running'},
  [States.Stopped]: {text: '🛑 stopped'},
  [States.Terminated]: {text: `🪦 ${chalk.gray('terminated')}`},
  [States.Starting]: {text: '⚡ starting'}
};

const createTable = function ({hideUtilization, calculateWaste, evaluationPeriod}) {
  let columns = [...columnsDefinition.baseColumns];
  columns = !hideUtilization ? [...columns, ...columnsDefinition.utilizationColumns] : columns;
  columns = calculateWaste ? [...columns, ...columnsDefinition.wasteColumns] : columns;
  return new Table({columns, charLength});
};


const printMachines = function (machinesData, {hideUtilization, calculateWaste, evaluationPeriod}) {
  const p = createTable({hideUtilization, calculateWaste, evaluationPeriod});

  machinesData.forEach((machine) => {
    let renderedMachine = {};
    let state = machine[Machine.State];
    let instanceId = machine[Machine.InstanceID];
    let machineType = machine[Machine.MachineType];

    renderedMachine[TABLE_FIELDS_MAP[Machine.State]] = stateRenderer[state].text;
    renderedMachine[TABLE_FIELDS_MAP[Machine.InstanceID]] = state == States.Terminated ? chalk.gray(instanceId) : instanceId;
    renderedMachine[TABLE_FIELDS_MAP[Machine.MachineType]] = machineType;

    if (!hideUtilization) {
      renderedMachine[TABLE_FIELDS_MAP[Machine.State]]
      let cpu = machine[Metrics.CPU];
      let disk = machine[Metrics.Disk];
      let network = machine[Metrics.Network];
      if (state == States.Running) {
        renderedMachine[TABLE_FIELDS_MAP[Metrics.CPU]] = `${cpu}%`;
        renderedMachine[TABLE_FIELDS_MAP[Metrics.Disk]] = `${disk} IO/s`;
        renderedMachine[TABLE_FIELDS_MAP[Metrics.Network]] = `${network} MB/s`
      }
    }
    if (calculateWaste) {
      let wastePerPeriod = machine[Waste.WastePerPeriod];
      let totalWaste = machine[Waste.TotalWaste];
      let idlePct = machine[Waste.IdlePct];
      renderedMachine[TABLE_FIELDS_MAP[Waste.WastePerPeriod]] = `$ ${wastePerPeriod}`;
      renderedMachine[TABLE_FIELDS_MAP[Waste.TotalWaste]] = `$ ${totalWaste}`
      renderedMachine[TABLE_FIELDS_MAP[Waste.IdlePct]] = `${idlePct}%`
    }
    p.addRow(renderedMachine);
  });

  p.printTable();

};

const printSummary = function (machinesData, {evaluationPeriod}) {
  let initialValue = {[Waste.WastePerPeriod]: 0, [Waste.TotalWaste]: 0};
  let aggregatedWaste = machinesData.reduce((previousValue, currentValue) => {
    return {
      [Waste.WastePerPeriod]: (previousValue[Waste.WastePerPeriod] + currentValue[Waste.WastePerPeriod]),
      [Waste.TotalWaste]: (previousValue[Waste.TotalWaste] + currentValue[Waste.TotalWaste]),
    };
  }, initialValue);
  console.log(chalk.yellowBright(`Over the last ${evaluationPeriod} days, you could have saved $${aggregatedWaste[Waste.WastePerPeriod]} 💰💰💰🤑🤑🤑`));
};

module.exports = {printMachines, printSummary}