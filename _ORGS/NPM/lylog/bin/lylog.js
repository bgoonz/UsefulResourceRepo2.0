#!/usr/bin/env node
var fs = require('fs')
var fastlyIps = __dirname + '/../fastly-ips.txt'
var lylog = require('../lylog.js')
var dashdash = require('dashdash')
var parser = dashdash.createParser({
  options: [
    { names: [ 'listen', 'l' ],
      type: 'number',
      help: 'Port that lylog listens on.  Required.',
      helpArg: 'PORT' },
    { names: [ 'token', 't' ],
      type: 'string',
      help: 'Loggly customer token.  Required.',
      helpArg: 'TOKEN' },
    { names: [ 'port', 'p' ],
      type: 'number',
      default: 514,
      help: 'Port to send Loggly messages to (default=514)',
      helpArg: 'PORT' },
    { names: [ 'host', 'H' ],
      type: 'string',
      default: 'logs-01.loggly.com',
      help: 'Hostname to send Loggly messages to ' +
        '(default=logs-01.loggly.com)',
      helpArg: 'HOST' },
    { names: [ 'echo', 'e' ],
      type: 'bool',
      default: false,
      help: 'Print logs to stdout as well as sending them to loggly' },
    { names: [ 'whitelist', 'w' ],
      type: 'string',
      helpArg: 'LIST',
      help: 'Whitespace-separated list of IPv4 blocks to accept.  ' +
        'Defaults to the known list of Fastly IPv4 address blocks as of ' +
        'lylog publish date (see "fastly-ips.txt" in lylog root).  ' +
        'Set to "ALLOW" to allow connections from ' +
        'any client (not recommended!)' },
    { names: [ 'help', 'h' ],
      type: 'bool',
      help: 'Display this help' }
  ]
})

var opts = parser.parse(process.argv, process.env)

if (opts.help)
  usage(true)

var fail = false

if (!opts.listen) {
  console.error('ERROR: --listen argument is required')
  fail = true
}

if (!opts.token) {
  console.error('ERROR: --token argument is required')
  fail = true
}

if (!opts.whitelist)
  opts.whitelist = fs.readFileSync(fastlyIps, 'ascii')
if (opts.whitelist === 'ALLOW') {
  console.error('WARNING: Allowing incoming lylog connections from any IP')
  opts.whitelist = false
} else
  opts.whitelist = opts.whitelist.trim().split(/[\n\r\s\t]/)


if (fail)
  usage(false)

function usage(ok) {
  var help = 'lylog [options]\nOptions:\n' + parser.help()
  ;(ok ? console.log : console.error)(help)
  process.exit(ok ? 0 : 1)
}

opts.onerror = function(er) {
  console.error('WRITE ERROR', er.stack)
  this.destroy()
}

var server = lylog(opts)
server.listen(opts.listen, function() {
  console.log('lylog proxy :%d -> %s:%d',
              opts.listen, opts.host, opts.port)
})
