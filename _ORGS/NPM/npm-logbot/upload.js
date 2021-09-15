// This is no longer relevant, since npm-lylog actually gets the downloads.
// There will rarely be a tgz in these logs, and when there is, it is almost
// certainly a duplicate.
return
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
var LogParse = require('couchdb-log-parse')
var fs = require('fs')
var zlib = require('zlib')

var parser = new LogParse()

var downloads = {}
var k
var counts = []

console.error('Parsing log file... ' + file);
var st = fs.createReadStream(file)
if (file.match(/\.gz$/)) st = st.pipe(zlib.Gunzip())

st.pipe(parser)
  .on('message', function (msg) {
    if (msg.type !== 'http' ||
        msg.statusCode !== 200 ||
        msg.method !== 'GET' ||
        !msg.url.match('tgz')) return
    var pkg = msg.url.split('/')[2]

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

  console.error('uploading count data...')
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
