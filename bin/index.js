#! /usr/bin/env node
const {Command} = require('commander');
const program = new Command();

program
  .name('cloudryer')
  .description('CLI to analyze AWS EC2 instances\' cost')
  .version('1.0.0');

program.command('list-machines')
  .description('List EC2 Machines')
  // .argument('<string>', 'string to split')
  // .option('--hide-utilization', "Won't show current CPU/network/disk usage")
  // .option('-t, --show-tags', 'Show associated tags/labels for each machine')
  .option('-w, --calculate-waste', 'Calculate money waste over a period of time')
  .option('-p, --evaluation-period [number]', 'Set waste evaluation period in days', 90)
  .action(async (options) => {
    const {listMachines} = require('../machines/commands');
    await listMachines(options);
    

  });

program.parse();