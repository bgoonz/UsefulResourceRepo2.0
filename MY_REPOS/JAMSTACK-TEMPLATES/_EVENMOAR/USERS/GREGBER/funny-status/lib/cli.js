/**
 * Module dependencies.
 */

var program = require('commander');
var pkg = require('../package.json');
var Daemon = require('../lib/daemon');

program
  .version(pkg.version)
  .option('-t, --time [n]', 'Ping wait time')
  .option('-T, --timeout [n]', 'Services timeout')
  .option('-x, --threshold [n]', 'Number of consecutive success / failure required to play sound')
  .option('-s, --service [list]', 'Custom services (ex: "github,npm")', parseServices)
  .option('-S, --success-sound [file]', 'Sound played when service up')
  .option('-F, --failure-sound [file]', 'Sound played when service down')
  .parse(process.argv);

/**
 * Convert service string to array.
 */

function parseServices(str) {
  if (! str) return undefined;
  return str.split(',');
}

// Create and start daemon.
var daemon = new Daemon(program);
daemon.start();