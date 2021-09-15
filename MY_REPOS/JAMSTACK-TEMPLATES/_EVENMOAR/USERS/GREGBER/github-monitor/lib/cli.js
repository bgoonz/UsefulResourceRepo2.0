var program = require('commander'),
  pkg = require('../package.json'),
  monitor = require('./monitor'),
  pick = require('lodash').pick;

program
  .version(pkg.version)
  .option('-t, --token <token>', 'GitHub access token')
  .option('-r, --references <values>',
    'Monitored references (ex: neoziro/github-monitor#master,neoziro/hulkster#master)', list)
  .option('-p, --port [port]', 'HTTP listening port', parseInt, 3778)
  .option('-R, --refresh [time]', 'Refresh time in seconds', parseInt, 10)
  .option('-T, --template [template]', 'Template to use', 'simple')
  .parse(process.argv);

function list(val) {
  return val.split(',');
}

if (! program.token || ! program.references) return program.help();

monitor(pick(program, 'token', 'references', 'port', 'refresh', 'template'));