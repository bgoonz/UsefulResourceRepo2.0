// start the couchdb spinning as a detached child process.
// the zz-teardown.js test kills it.

var spawn = require('child_process').spawn
var test = require('tap').test
var path = require('path')
var fs = require('fs')
var http = require('http')
var url = require('url')
var parse = require('parse-json-response')
var mkdirp = require('mkdirp')

// just in case it was still alive from a previous run, kill it.
require('./zz-teardown.js')

// run with the cwd of the main program.
var cwd = path.dirname(__dirname)

var conf = path.resolve(__dirname, 'fixtures', 'couch.ini')
var pid = path.resolve(__dirname, 'fixtures', 'pid')
var log = path.resolve(__dirname, 'fixtures', 'couch.log')

var started = /Apache CouchDB has started on http:\/\/127\.0\.0\.1:1598[45]\/\n$/


function startCouch (n, t) {
  var pidfile = pid + '-' + n
  var logfile = log + '-' + n
  var confsrc = conf + '-' + n
  var couchdir = path.resolve(__dirname, 'fixtures', ''+n)
  var conffile = path.resolve(__dirname, 'fixtures', ''+n, 'couch.ini')

  mkdirp.sync(couchdir)
  fs.writeFileSync(conffile, fs.readFileSync(confsrc))

  var fd = fs.openSync(pidfile, 'wx')

  try { fs.unlinkSync(logfile) } catch (er) {}

  var child = spawn('couchdb', ['-a', conffile], {
    detached: true,
    stdio: 'ignore',
    cwd: cwd
  })
  child.unref()
  t.ok(child.pid)
  fs.writeSync(fd, child.pid + '\n')
  fs.closeSync(fd)

  // wait for it to create a log, give it 5 seconds
  var start = Date.now()
  fs.readFile(logfile, function R (er, log) {
    log = log ? log.toString() : ''
    if (!er && !log.match(started))
      er = new Error('not started yet')
    if (er) {
      if (Date.now() - start < 5000)
        return setTimeout(function () {
          fs.readFile(logfile, R)
        }, 50)
      else
        throw er
    }
    t.pass('relax')
    t.end()
  })
}

test('start couch 1', startCouch.bind(null, 1))
test('start couch 2', startCouch.bind(null, 2))

test('create test db 1', createDb.bind(null, 15984))
test('create test db 2', createDb.bind(null, 15985))

function createDb(port, t) {
  var u = url.parse('http://admin:admin@localhost:' + port + '/registry')
  u.method = 'PUT'
  http.request(u, function(res) {
    t.equal(res.statusCode, 201)
    var c = ''
    res.setEncoding('utf8')
    res.on('data', function(chunk) {
      c += chunk
    })
    res.on('end', function() {
      c = JSON.parse(c)
      t.same(c, { ok: true })
      t.end()
    })
  }).end()
}

test('create ddoc', function(t) {
  var body = new Buffer(JSON.stringify({
    _id: 'test',
    language: 'javascript',
    views: {
      test: {
        map: function(doc) {
          for (var v in doc.versions) {
            emit([doc.name, v, doc.versions[v]], 1)
          }
          for (var m in doc.maintainers) {
            emit([doc.name, m, doc.maintainers[m]], 100)
          }
        },
        reduce: '_sum'
      }
    }
  }, function(k, v) {
    return (typeof v === 'function') ? v.toString() : v
  }))

  var u = url.parse('http://admin:admin@localhost:15984/registry/_design/test')
  u.method = 'PUT'
  u.headers = {
    'content-type': 'application/json',
    'content-length': body.length,
    connection: 'close'
  }
  http.request(u, function(res) {
    t.equal(res.statusCode, 201)
    if (res.statusCode !== 201)
      res.pipe(process.stderr)
    t.end()
  }).end(body)
})

test('create test record', function(t) {
  var testPkg = require('./fixtures/test-package.json')
  var tf = path.resolve(__dirname, 'fixtures/test-package-0.0.0.tgz')
  var tgzData = fs.readFileSync(tf, 'base64')
  testPkg._attachments['test-package-0.0.0.tgz'].data = tgzData
  testPkg._attachments['test-package-0.0.0.tgz'].stub = false
  testPkg._attachments['test-package-0.0.0-blerg.tgz'] =
    JSON.parse(JSON.stringify(testPkg._attachments['test-package-0.0.0.tgz']))

  var body = new Buffer(JSON.stringify(testPkg))
  var u = url.parse('http://admin:admin@localhost:15984/registry/test-package')
  u.method = 'PUT'
  u.headers = {
    'content-type': 'application/json',
    'content-length': body.length,
    connection: 'close'
  }
  http.request(u, function(res) {
    t.equal(res.statusCode, 201)
    if (res.statusCode !== 201)
      res.pipe(process.stderr)
    t.end()
  }).end(body)
})

test('load view', function(t) {
  var u = url.parse('http://localhost:15984/registry/_design/test/_view/test?group=true')
  u.headers = {
    connection: 'close'
  }
  http.get(u, function(res) {
    t.equal(res.statusCode, 200)
    t.end()
  })
})

test('verify that view is there', function(t) {
  fs.statSync(__dirname + '/fixtures/1/.registry_design/mrview/fb46477815586959b7e85bb7d76a1349.view')
  t.pass('ok')
  t.end()
})

test('normalize path 1', function(t) {
  var p = 'http://admin:admin@localhost:15984/_config/couchdb/view_index_dir'
  p = url.parse(p)
  p.method = 'PUT'
  var body = JSON.stringify(path.resolve(__dirname + "/fixtures/1"))
  p.headers = {
    'content-length': body.length,
    'content-type': 'application/json',
    connection: 'close'
  }
  var req = http.request(p)
  req.end(body)
  req.on('response', function(res) {
    t.equal(res.statusCode, 200)
    t.end()
  })
})

test('normalize path 2', function(t) {
  var p = 'http://admin:admin@localhost:15985/_config/couchdb/view_index_dir'
  p = url.parse(p)
  p.method = 'PUT'
  var body = JSON.stringify(path.resolve(__dirname + "/fixtures/2"))
  p.headers = {
    'content-length': body.length,
    'content-type': 'application/json',
    connection: 'close'
  }
  var req = http.request(p)
  req.end(body)
  req.on('response', function(res) {
    t.equal(res.statusCode, 200)
    t.end()
  })
})
