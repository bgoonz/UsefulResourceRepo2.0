// kill the couchdb process that's running as a detached child process
// started by the 00-setup.js test

var fs = require('fs')
var test = require('tap').test
var path = require('path')
var pid = path.resolve(__dirname, 'fixtures', 'pid')
var log = path.resolve(__dirname, 'fixtures', 'couch.log')
var db = path.resolve(__dirname, 'fixtures')
var rimraf = require('rimraf')
var url = require('url')
var http = require('http')

function clean(n, t) {
  var pidfile = pid + '-' + n
  var logfile = log + '-' + n
  var dbdir = db + '/' + n

  try {
    var p = fs.readFileSync(pidfile)
  } catch (er) {}

  if (p) {
    try { process.kill(p) } catch (er) {
      // ok if already killed
      t.equal(er.code, 'ESRCH')
    }
  }

  rimraf.sync(pidfile)
  rimraf.sync(logfile)
  rimraf.sync(dbdir)
  t.pass('cleaned ' + n)
  t.end()
}

test('clean 1', clean.bind(null, 1))
test('clean 2', clean.bind(null, 2))
