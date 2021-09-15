#!/usr/bin/env node

var _ = require('lodash'),
  yargs = require('yargs')
    .options('f', {
      alias: 'follow',
      description: 'remote server to follow'
    })
    .usage('list-servers:\tlist the remote servers'),
  dotenv = require('dotenv'),
  Ec2Hosts = require('../lib/ec2-hosts'),
  LoadDotLog = require('../lib/load-dot-log.js'),
  Tail = require('../lib/tail');

dotenv.load(); // load the .env file which contains ec2 credentials.

if (yargs.argv._[0] === 'list-servers') {
  // List remote hosts, make sure there's a Name tag on your servers.
  new Ec2Hosts().getHosts(function(err, hosts) {
    var names = _.map(hosts, function(h) {return h.name;}).sort();
    names.forEach(function(n) {
      console.log(n);
    });
  });
} else if (yargs.argv.follow) {
  // Tail your remote logs:
  new Ec2Hosts().getHosts(function(err, hosts) {
    // 1. get a list of hosts.

    // 2. select the host which matches -f host-name.
    var remoteHost = _.select(hosts, function(h) {
      return h.name === yargs.argv.follow
    })[0].host;

    // 3. load the ~/.log file.
    new LoadDotLog({
      remoteHost: remoteHost
    }).load(function(err, logData) {
      // 4. tail the logs listed in ~/.log.
      new Tail({
        remoteHost: remoteHost,
        logFiles: logData.trim().split('\n')
      }).start();
    });
  });
} else {
  console.log(yargs.help());
}
