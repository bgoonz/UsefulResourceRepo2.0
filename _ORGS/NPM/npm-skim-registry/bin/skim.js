#!/usr/bin/env node

var
     Skimmer  = require('../skim'),
     bunyan   = require('bunyan'),
     dashdash = require('dashdash'),
     MultiFS  = require('multi-fs'),
     path     = require('path'),
     util     = require('util')
     ;

var parser = dashdash.createParser({
  options: [
    { names: [ 'config', 'f' ],
      type: 'string',
      help: 'config file for multifs targets; required',
      helpArg: 'FILE' },
    { names: [ 'seq-file', 'Q' ],
      type: 'string',
      help: 'File to store the sequence in, required',
      helpArg: 'FILE' },
    { names: [ 'seq', 'q' ],
      type: 'number',
      help: 'Sequence ID to start at; overrides sequence in file',
      helpArg: 'NUMBER' },
    { names: [ 'registry', 'r' ],
      type: 'string',
      help: 'The registry where attachments can be found; optional',
      helpArg: 'URL' },
    { names: [ 'inactivity-ms' ],
      type: 'number',
      help: 'Max ms to wait before assuming disconnection.',
      helpArg: 'MS' },
    { names: [ 'delete', 'd' ],
      type: 'bool',
      help: 'Delete removed attachments and docs from targets' },
    { names: [ 'skimdb', 's'] ,
      type: 'string',
      helpArg: 'URL',
      help: 'Target to write attachment-free docs. ' +
            'Defaults to put back into COUCHDB arg.' },
    { names: ['help', 'h'],
      type: 'bool',
      help: 'Print this help and exit' },
  ]
});

var opts = parser.parse(process.argv, process.env);
var args = opts._args;

if (opts.help || args.length !== 3)
{
    usage();
    process.exit();
}

if (args.length !== 3)
{
    usage();
    process.exit(1);
}

function usage()
{
    console.log(
        'npm-skim-registry - Skim the fat out of your registry couchdb\n' +
        'Usage: npm-skim-registry [args] COUCHDB\n' +
        '\n' +
        '    COUCHDB                   Full url to your couch, e.g.,\n'+
        '                              http://localhost:5984/database');
    console.log(parser.help());
}

var logopts =
{
    name: 'npm-skim-registry',
    serializers: bunyan.stdSerializers,
    streams: [ ]
};

if (process.env.NODE_ENV === 'dev')
    logopts.streams.push({level: 'debug', stream: process.stdout});
else
    logopts.streams.push({level: 'info', stream: process.stdout});

var logger = bunyan.createLogger(logopts);


var targets = require(path.resolve(opts.config));
var client = new MultiFS(targets);

var skimmer = new Skimmer({
    client:        client,
    sequence:      opts.seq,
    sequenceFile:  opts.seq_file,
    inactivity_ms: opts.inactivity_ms,
    delete:        opts.delete,
    source:        args[2],
    skimdb:        opts.skimdb,
    registry:      opts.registry || null,
}).on('put', function(change) {
    logger.info('PUT ' + change.id);
}).on('rm', function(change) {
    logger.info('RM ' + change.id);
}).on('send', function(change, file) {
    logger.info(util.format('-> sent %s', file));
}).on('delete', function(change, remote) {
    logger.info(util.format('-> deleted %s/%s', change.id, remote));
}).on('putBack', function(change) {
    logger.warning(util.format('-> putback %s', change.id));
}).on('log', function(msg) {
    logger.debug('LOG: ' + msg);
});

skimmer.start();
logger.info('now skimming ' + skimmer.source + ' into ' + skimmer.skimdb);
