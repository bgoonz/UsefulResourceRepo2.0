// Pre-emptive purging of the fastly cache fronting registry.npmjs.org.
// Clear out user and packages as they change.

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

var conf = require('./config.js')
var follow = require('follow')
var fastly = require('fastly')(conf.fastlykey)
var path = require('path')
var fs = require('fs')

var SF = require('seq-file')
var regSeq = new SF(path.resolve(__dirname, 'registry.seq'))
var uSeq = new SF(path.resolve(__dirname, '_users.seq'))

// /registry/:pkg -> invalidate /:pkg
// /_users/:user -> invalidate /-/user/:user
// For views and such, just let the TTL and ETags do their thing

follow({
  db: conf.registry,
  include_docs: true,
  inactivity_ms: conf.inactivity_ms,
  since: regSeq.readSync()
}, function onchange (er, change) {
  if (er)
    throw er

  // Make sure that we're at least c.lag ms behind the db
  var doc = change.doc
  if (doc && doc.time && doc.time.modified) {
    var modified = Date.parse(doc.time.modified)
    var now = Date.now()
    var age = now - modified
    if (age < conf.lag) {
      return setTimeout(function() {
        purge.call(this, '/' + change.id, regSeq, change.seq)
      }.bind(this), conf.lag - age)
    }
  }

  // Otherwise, if old enough, or no time info, just do it now.
  purge.call(this, '/' + change.id, regSeq, change.seq)
})

follow({
  db: conf._users,
  include_docs: false,
  inactivity_ms: conf.inactivity_ms,
  since: uSeq.readSync()
}, userPurge)

function userPurge (er, change) {
  if (er)
    throw er
  purge.call(this, '/-/user/' + change.id, uSeq, change.seq)
}

function purge(url, seqFile, seq) {
  console.log('PURGE %s', url)
  this.pause()
  fastly.purge(conf.host, url, onpurge.bind(this, seqFile, seq))
}

function onpurge(seqFile, seq, er) {
  if (er && er.statusCode !== 404)
    throw er
  seqFile.save(seq)
  this.resume()
}
