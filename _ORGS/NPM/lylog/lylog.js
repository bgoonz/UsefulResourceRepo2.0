var net = require('net')
var assert = require('assert')
var util = require('util')

// fastly logs look like:
// <134>2013-12-23T03:39:13Z cache-lax19 logname[7556]: $MSG\n
// logly wants:
// <134>1 2013-12-23T03:39:13Z cache-lax19 logname 7556 "-" [$TOKEN] $MSG\n

module.exports = proxy

var cidrMatch = require('cidr_match').cidr_match

var locals = [
  '192.168.0.0/16',
  '10.0.0.0/8',
  '172.16.0.0/12',
  '127.0.0.1'
]

function proxy(conf) {
  assert(conf)
  assert.equal(typeof conf, 'object')
  assert.equal(typeof conf.token, 'string')

  if (conf.host === undefined)
    conf.host = 'logs-01.loggly.com'
  assert.equal(typeof conf.host, 'string')

  if (conf.port === undefined)
    conf.port = 514
  assert.equal(typeof conf.port, 'number')

  if (conf.whitelist) {
    assert(Array.isArray(conf.whitelist))
    conf.whitelist = conf.whitelist.filter(function(cidr) {
      assert.equal(typeof cidr, 'string')
      return (cidr && cidr.charAt(0) !== '#')
    }).concat(locals)
  }

  // Undocumented feature: Share connections with another lylog instance.
  // If you use this, make sure that you also specify the same minFree
  // and freeReapRatio values, or else undefined behavior happens.
  conf.writers = conf.writers || []
  assert(Array.isArray(conf.writers))

  conf.free = conf.free || []
  assert(Array.isArray(conf.free))

  if (conf.freeReapRatio === undefined)
    conf.freeReapRatio = 0.5
  assert.equal(typeof conf.freeReapRatio, 'number')
  assert(conf.freeReapRatio <= 1)
  assert(conf.freeReapRatio > 0)

  if (conf.minFree === undefined)
    conf.minFree = 16
  assert.equal(typeof conf.minFree, 'number')
  assert(conf.minFree > 0)
  assert.equal(conf.minFree, ~~conf.minFree)

  if (conf.echo !== undefined)
    assert.equal(typeof conf.echo, 'boolean')
  else
    conf.echo = false

  if (conf.onerror !== undefined)
    assert.equal(typeof conf.onerror, 'function')
  else
    conf.onerror = false

  var server = new net.Server(parse(conf))
  server.close = close(conf)
  return server
}

function close(conf) { return function(cb) {
  conf.writers.forEach(function(writer) {
    writer.end()
    writer.unref()
  })
  net.Server.prototype.close.call(this, cb)
}}

function parse(conf) { return function parser(socket) {
  if (conf.whitelist) {
    var from = socket.remoteAddress
    var match = conf.whitelist.some(function (cidr) {
      return cidrMatch(from, cidr)
    })
    if (!match) {
      console.error('Rejected connection from %s', from)
      socket.destroy()
      return
    }
  }

  socket.setEncoding('utf8')
  var buf = ''
  socket.on('data', function(c) {
    buf += c
    var lines = buf.split(/\r?\n/)
    buf = lines.pop()
    lines.forEach(line(conf, socket))
  })
}}

var parseRe = /^(<[0-9]+>)([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z) ([^ ]+) ([^[]+)\[([^\]]+)\]: (.*)$/
var fmt = '%s1 %s %s %s %s "-" [%s@41058] '


function line(conf, socket) { return function(l, _, __) {
  var p = l.match(parseRe)
  if (!p) {
    console.error(parseRe)
    return console.error('Invalid log line: %j', l)
  }

  var pri = p[1]
  var date = p[2]
  var hostname = p[3]
  var appname = p[4]
  var procid = p[5]
  var msg = p[6]

  var token = conf.token

  var header = util.format(fmt, pri, date, hostname, appname, procid, token)

  send(conf, socket, header, date, msg)
}}

function send(conf, socket, header, date, msg) {
  var writer = getWriter(conf)
  if (!writer.write(header + msg + '\n')) {
    socket.pause()
    writer.once('drain', ondrain(conf, socket))
  } else
    conf.free.push(writer)
  if (conf.echo)
    console.log(date + ' ' + msg)

  reap(conf)
}

function reap(conf) {
  if (conf.free.length > conf.minFree &&
      conf.free.length / conf.writers.length > conf.freeReapRatio) {
    var i = Math.max(conf.minFree, Math.floor(free.length / 2))
    var r = free.slice(i)
    free = free.slice(0, i)
    r.forEach(function(socket) {
      socket.destroy()
    })
  }
}

function ondrain(conf, socket) { return function() {
  conf.free.push(this)
  reap(conf)
  socket.resume()
}}

function getWriter(conf) {
  if (!conf.writers)
    conf.writers = []
  if (!conf.free)
    conf.free = []

  return conf.free.shift() || newWriter(conf)
}

function newWriter(conf) {
  var writer = net.connect(conf)
  if (conf.onerror)
    writer.on('error', conf.onerror)
  writer.once('close', onclose(conf))
  writer.setKeepAlive(true, 1000)
  conf.writers.push(writer)
  return writer
}

function onclose(conf) { return function() {
  var i = conf.writers.indexOf(this)
  if (i !== -1)
    conf.writers.splice(i, 1)
  i = conf.free.indexOf(this)
  if (i !== -1)
    conf.free.splice(i, 1)
}}
