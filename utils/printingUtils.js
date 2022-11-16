import Ora from 'ora';

let spinner;
const printUpdate = function (message) {
  if (spinner) {
    spinner.succeed(`${spinner.text} - Completed!`);
  }
  if (message) {
    spinner = Ora(message).start();
  }
};

export { printUpdate };