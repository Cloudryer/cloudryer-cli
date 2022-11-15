#! /usr/bin/env node


import {Command} from 'commander';
import {listMachines} from '../machines/commands.js';
const program = new Command();


program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('list-machines')
  .description('List EC2 Machines')
  // .argument('<string>', 'string to split')
  .option('--hide-utilization', "Won't show current CPU/network/disk usage")
  .option('-t, --show-tags', 'Show associated tags/labels for each machine')
  .option('-w, --calculate-waste', 'Calculate money waste over a period of time')
  .option('-p, --evaluation-period [number]', 'Set waste evaluation period in days', 90)
  .action(async (options) => {

    await listMachines(options);
    // const limit = options["first"] ? 1 : undefined;

  });

program.parse();