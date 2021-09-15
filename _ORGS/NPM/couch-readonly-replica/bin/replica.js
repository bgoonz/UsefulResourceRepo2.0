#!/usr/bin/env node
var Replica = require('../');
var dashdash = require('dashdash');
var parser = dashdash.createParser({
  options: [
    { names: [ 'local-couch', 'l' ],
      type: 'string',
      helpArg: 'URL',
      help: 'The local CouchDB instance url' },
    { names: [ 'remote-couch', 'r' ],
      type: 'string',
      help: 'Location of remote Couch server',
      helpArg: 'URL' },
    { names: [ 'ssh-key', 'k' ],
      type: 'string',
      helpArg: 'KEY',
      help: 'Path to ssh private key, like ~/.ssh/id_rsa' },
    { names: [ 'remote-host', 'H' ],
      type: 'string',
      helpArg: 'HOST',
      help: 'Hostname to rsync into (inferred ' +
            'from remote-couch if not set)' },
    { names: [ 'remote-user', 'u' ],
      type: 'string',
      helpArg: 'USER',
      help: 'Username on remote machine. Default: USER environ' },
    { names: [ 'seq-file', 'q' ],
      type: 'string',
      help: 'File to store the sequence in',
      helpArg: 'FILE' },
    { names: [ 'dbs', 'd' ],
      type: 'arrayOfString',
      help: 'Whitelist of databases to replicate',
      helpArg: 'DB' },
    { names: [ 'inactivity-ms', 'i' ],
      type: 'number',
      help: 'Number of MS to wait for a change before giving up',
      helpArg: 'MS' },
    { names: [ 'user-agent', 'a' ],
      type: 'string',
      help: 'User-agent string',
      helpArg: 'UA' },
    { names: [ 'help', 'h' ],
      type: 'bool',
      help: 'Display this help message' }
  ]
})

var opts = parser.parse(process.argv, process.env);
var args = opts._args;

if (opts.help)
  return usage()

function usage() {
  console.log(usage.toString().split(/\n/).slice(4, -2).join('\n'));
  console.log(parser.help());
/*
couch-readonly-replica - replicate docs and views
usage: couch-readonly-replica [args]

*/
}

try {
  var r = new Replica({
    seqFile: opts.seq_file,
    remoteCouch: opts.remote_couch,
    localCouch: opts.local_couch,
    ua: opts.user_agent,
    dbs: opts.dbs,
    remoteHost: opts.remote_host,
    remoteUser: opts.remote_user,
    sshKey: opts.ssh_key
  })
} catch (er) {
  usage()
  console.error(er.message)
  process.exit(1)
}

r.on('error', function(er) {
  console.error(er)
  throw er
}).on('change', function(c) {
  console.log('%d %s/%s', c.seq, c.db, c.id)
}).on('delete', function(c) {
  console.log('%d DELETE %s/%s', c.seq, c.db, c.id)
}).on('put', function(c) {
  console.log('%d PUT %s/%s', c.seq, c.db, c.id)
}).on('rsync', function(out, er) {
  // meh.
})
