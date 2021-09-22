process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

var config = require('./config.js')
if (!config.couch) {
  throw new Error('must set an exports.couch url in config.js')
}
if (!config.couch.match(/\/$/)) config.couch += '/'

if (config.auth) {
  var auth = new Buffer(config.auth).toString('base64')
}

var file = process.argv[2]
if (!file) throw new Error('usage: node upload.js <logfile>')

var WORKERS = +process.env.WORKERS || 48

var request = require('request')
var fs = require('fs')
var zlib = require('zlib')
var util = require('util')
var EE = require('events').EventEmitter

var fmt = /^([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z) ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}) "([^"]+)" "([A-Z]+) ([^"]+)" ([0-9]{3}) "([^"]+)" "([^"]+)"$/
function LogParse() {
  this._buf = ''
  EE.apply(this)
}
util.inherits(LogParse, EE)
LogParse.prototype.write = function(chunk) {
  this._buf += chunk
  var lines = this._buf.split(/\r?\n/)
  this._buf = lines.pop()
  this._parse(lines)
}

LogParse.prototype._parse = function(lines) {
  lines.forEach(this._line, this)
}

LogParse.prototype._line = function(line) {
  if (!line)
    return

  var p = line.match(fmt)
  if (!p) {
    console.error('wtf line\n' + JSON.stringify(line))
    return
  }
  this.emit('message', {
    date: new Date(p[1]),
    ip: p[2],
    user: p[3],
    type: 'http',
    method: p[4],
    url: p[5],
    statusCode: +p[6],
    userAgent: p[7],
    hit: p[8] === 'HIT'
  })
}

LogParse.prototype.end = function() {
  this._line(this._buf)
  this.buf = ''
  this.emit('end')
}


var parser = new LogParse()

var downloads = {}
var k
var counts = []

console.error('Parsing log file... ' + file);
var st = fs.createReadStream(file)
if (file.match(/\.gz$/)) st = st.pipe(zlib.Gunzip())
st.setEncoding('ascii')

st.pipe(parser)
  .on('message', function (msg) {
    if (msg.type !== 'http' ||
        msg.statusCode !== 200 ||
        msg.method !== 'GET' ||
        !msg.url.match(/tgz$/)) {
      return
    }
    var file = msg.url.split('/').pop()
    var parts = file.split('-')
    var vt = parts.pop()
    var pkg = parts.join('-')
    vt = vt.split('.')
    var tgz = vt.pop()
    if (tgz !== 'tgz') {
      console.error('skip, not tgz', msg)
      return
    }
    var ver = vt.join('.')

    k = k || msg.date.getTime()
    var day = msg.date.toISOString().split('T')[0]
    downloads[day] = downloads[day] || {}
    var d = downloads[day]

    d[pkg] = d[pkg] || 0
    d[pkg] ++
  })
  .on('end', function () {
    console.error('tallying up counts...')
    Object.keys(downloads).forEach(function (d) {
      var day = downloads[d]
      Object.keys(day).forEach(function (pkg) {
        var count = day[pkg]
        counts.push({ _id: pkg + '_' + k + '_' + d,
                      pkg: pkg,
                      count: count,
                      day: d })
      })
    })
    uploadCounts()
  })

function uploadCounts () {
  if (!counts) throw new Error('must tally up first')

  console.error('uploading count data...', counts)
  var i = 0;
  for (var i = 0; i < WORKERS; i ++) work(i)
}

function work (id) {
  var c = counts.pop()
  if (!c) return console.log('done worker '+id);
  var r = { uri: config.couch + c._id,
            body: c,
            method: 'PUT',
            json: true }
  if (auth) r.headers = { authorization: 'Basic ' + auth }
  console.error(counts.length, c._id, c.count)
  request(r, function (er, res, body) {
    if (er || (res && res.statusCode >= 400)) {
      console.error(c._id, res && res.statusCode || er)
    }
    work(id)
  })
}
