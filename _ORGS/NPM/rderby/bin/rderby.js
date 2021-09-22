#!/usr/bin/env node

var RDerby = require('../index'),
  yargs = require('yargs')
    .options('b', {
      alias: 'backend',
      description: 'HAProxy backend',
      default: 'back'
    })
    .options('h', {
      alias: 'health-check',
      description: 'health check endpoint',
      default: '/_monitor/ping'
    });
  commands = {
    'roll': {
      description: 'roll\t perform the rolling restart',
      command: function(arguments) {
        new RDerby({
          healthCheck: arguments.healthCheck,
          backend: arguments.backend,
          services: arguments._.slice(1)
        }).roll();
      }
    }
  },
  usageString = "rderby executes a rolling restart on a set of services\n\n";

// generate usage string.
Object.keys(commands).forEach(function(command) {
  usageString += commands[command].description;
});

yargs.usage(usageString);

// display help if command is not recognized.
if (yargs.argv.help || !commands[yargs.argv._[0]]) {
  console.log(yargs.help());
} else {
  commands[yargs.argv._[0]].command(yargs.argv);
}
