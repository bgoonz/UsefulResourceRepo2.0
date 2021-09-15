/**
 * Module dependencies.
 */

var program = require('commander');
var pkg = require('../package.json');
var Server = require('./server');

program
  .version(pkg.version)
  .option('-p, --port [port]', 'Http port.')
  .option('-e, --eshost [host]', 'Elastic search host, default 9400.')
  .parse(process.argv);

// Create and start daemon.
var server = new Server({
  es: {
    host: program.eshost
  }
});
server.listen(program.port || 9400);