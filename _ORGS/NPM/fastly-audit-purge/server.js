// Pre-emptive purging of the fastly cache fronting registry.npmjs.org.
// Clear out user and packages as they change.

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

var conf = require('./config.js')
var follow = require('follow')
var fastly = require('fastly')(conf.fastlykey)
var http = require('http')
var crypto = require('crypto')
var spawn = require('child_process').spawn

var SeqFile = require('seq-file')
var sf = new SeqFile(__dirname + '/registry.seq')
sf.readSync()

// get the list of hosts.
var hc = spawn('host', [ '-t', 'any', 'a.sni.fastly.net' ])
var hosts = ''
hc.stderr.pipe(process.stderr)
hc.stdout.setEncoding('utf8')
hc.stdout.on('data', function(c) {
  hosts += c
})
hc.on('close', function (code, sig) {
  if (code || sig) {
    console.error('error getting hosts')
    process.exit(code || 1)
  }

  hosts = hosts.trim().split('\n').map(function (h) {
    return h.split(' ').pop()
  })

  if (!hosts.length) {
    console.error('error getting hosts', hosts)
    process.exit(1)
  }

  doFollow()
})


function doFollow() {
  follow({
    db: conf.registry,
    include_docs: false,
    inactivity_ms: conf.inactivity_ms,
    since: sf.seq
  }, function (er, change) {
    if (er)
      throw er

    test.call(this, change)
  })
}

function test(change) {
  this.pause()

  var n = hosts.length
  var errState = null
  var d = null

  hosts.forEach(function(host) {
    testHost.call(this, host, change, then.bind(this, host))
  }.bind(this))

  function then(host, er, data) {
    if (!d)
      d = data

    if (errState)
      return
    else if (er || !data || data !== d) {
      // purge!
      errState = er || new Error('bad data')
      console.error('%s: error from %s', change.id, host, errState)
      purge.call(this, change)
    } else if (--n === 0) {
      done.call(this, change, null)
    }
  }
}

function testHost(host, change, cb) {
  http.get({
    host: host,
    method: 'GET',
    path: '/' + change.id,
    headers: {
      'user-agent': 'npm-fastly-audit-purger',
      'host': conf.host,
      'accept': 'application/json'
    }
  }, onresponse.bind(this, host, change, cb))
}

function onresponse(host, change, cb, res) {
  if (res.statusCode !== 200) {
    throw new Error('failed to fetch http://'+
                    host + '/' + change.id + '\n' +
                    'Status: ' + res.statusCode)
  }

  if (res.headers['content-type'] !== 'application/json') {
    return cb(new Error('non-json content-type: ' +
                        res.headers['content-type']))
  }

  res.setEncoding('utf8')
  var j = ''
  res.on('data', function(c) { j += c })
  res.on('end', function() { cb(null, j) })
  res.on('error', cb)
}

function purge(change) {
  console.log('PURGE %s', '/' + change.id)
  fastly.purge(conf.host, '/' + change.id, done.bind(this, change))
}

function done(change, er) {
  if (er)
    throw er
  console.log('ok ' + change.id)
  sf.save(change.seq)
  this.resume()
}
