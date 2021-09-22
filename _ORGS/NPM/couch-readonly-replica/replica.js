var follow = require('follow')
var execFile = require('child_process').execFile
var assert = require('assert')
var url = require('url')
var SeqFile = require('seq-file')
var hh = require('http-https')
var parse = require('parse-json-response')

var pkg = require('./package.json')
var ua = pkg.name + '/' + pkg.version + ' node/' + process.version

var EE = require('events').EventEmitter
var util = require('util')
util.inherits(Replica, EE)

module.exports = Replica

function Replica(conf) {
  if (!(this instanceof Replica))
    return new Replica(conf)

  this.dbs = null;
  if (conf.dbs) {
    assert(Array.isArray(conf.dbs), 'conf.dbs must be an array')
    this.dbs = conf.dbs
  }

  this.inactivity_ms = 0
  if (conf.inactivity_ms) {
    assert(typeof conf.inactivity_ms == 'number',
           'conf.inactivity must be number')
    this.inactivity_ms = conf.inactivity_ms
  }

  this.ua = conf.ua || ua

  assert(conf.remoteCouch, 'conf.remoteCouch required')
  this.remoteCouch = url.parse(conf.remoteCouch)
  assert(this.remoteCouch.protocol, 'conf.remoteCouch must be a url')

  if (!conf.remoteHost)
    this.remoteHost = this.remoteCouch.host
  else
    this.remoteHost = conf.remoteHost

  var u = conf.remoteUser || process.env.USER
  assert(u, 'conf.remoteUser required')
  this.remoteUser = u

  assert(conf.sshKey, 'conf.sshKey required')
  assert(!conf.sshKey.match(/ |"/), 'no spaces allowed')
  var sk = conf.sshKey.replace(/^~/, process.env.HOME)
  this.sshKey = sk

  assert(conf.localCouch, 'conf.localCouch is required')
  this.localCouch = url.parse(conf.localCouch)
  assert(this.localCouch.protocol, 'conf.localCouch must be a url')

  assert(conf.seqFile, 'conf.seqFile is required')
  this.seqFile = conf.seqFile
  this.seqFiles = {}

  this.remoteDatabaseDir = ''
  this.remoteViewIndexDir = ''
  this.localDatabaseDir = ''
  this.localViewIndexDir = ''

  this.pending = {}
  this.rsyncs = {}
  this.follows = {}
  this.seq = 0
  this.init()
}

Replica.prototype.init = function(er, seq) {
  if (er)
    return this.emit('error', er)

  this.seq = seq

  var r = this.remoteCouch.href
  var l = this.localCouch.href

  var keys = {
    remoteViewIndexDir: r + '_config/couchdb/view_index_dir',
    localViewIndexDir: l + '_config/couchdb/view_index_dir'
  }

  if (!this.dbs || !this.dbs.length)
    keys.dbs = r + '_all_dbs'

  var values = {}
  var n = 0
  Object.keys(keys).forEach(function(k) {
    n++
    var req = hh.get(keys[k])
    req.on('error', this.emit.bind(this, 'error'))
    req.on('response', parse(then.bind(this, k)))
  }, this)

  function then(k, er, data, res) {
    if (er)
      return this.emit('error', er)
    this[k] = data
    if (--n === 0)
      this.start()
  }
}

Replica.prototype.start = function() {
  // At this point, we know everything we need to.
  // start following, and keep a queue of workers to do the rsyncs.
  this.dbs.forEach(function(db) {
    if (db !== '_replicator')
      this.startFollow(db)
  }.bind(this))
}

Replica.prototype.startFollow = function(db) {
  this.seqFiles[db] = new SeqFile(this.seqFile + '.' + db)
  this.seqFiles[db].read(function(er, seq) {
    this.follows[db] = follow({
      db: this.remoteCouch.href + db,
      since: seq,
      inactivity_ms: this.inactivity_ms,
      include_docs: false,
      headers: {
        'user-agent': this.ua
      }
    }, this.onChange.bind(this, db))
  }.bind(this))
}

Replica.prototype.onChange = function(db, er, change) {
  if (er)
    return this.emit('error', er)

  change.db = db
  this.emit('change', change)
  if (change.id.match(/^_design\//))
    this.ddoc(change)
  else
    this.doc(change)
}

Replica.prototype.doc = function(change) {
  // nothing fancy. just get the doc and put it in the target location.
  this.follows[change.db].pause()
  if (change.deleted)
    this.del(change)
  else
    this.copy(change)
}

Replica.prototype.del = function(change) {
  var p = change.db + '/' + change.id
  var r = url.parse(this.localCouch.href + p)
  r.headers = {
    'user-agent': this.ua
  }
  r.method = 'HEAD'
  var req = hh.request(r, this.onDelHead.bind(this, change))
  req.on('error', this.emit.bind(this, 'error'))
}

Replica.prototype.onDelHead = function(change, res) {
  if (res.statusCode === 400)
    return this.done(change)

  if (res.statusCode !== 200) {
    var er = new Error('Error fetching rev')
    er.href = this.remoteCouch.href + change.db + '/' + change.id
    er.statusCode = res.statusCode
    return this.emit('error', er)
  }

  var rev = res.headers.etag.replace(/^"|"$/g, '')
  var p = change.db + '/' + change.id + '?rev=' + rev
  var r = url.parse(this.localCouch.href + p)
  r.headers = {
    'user-agent': this.ua
  }
  r.method = 'DELETE'
  var req = hh.request(r, parse(this.onDelete.bind(this, change)))
  req.on('error', this.emit.bind(this, 'error'))
}

Replica.prototype.onDelete = function(change, er, data, res) {
  if (er && er.statusCode === 404)
    er = null
  if (er)
    return this.emit('error', er)
  this.emit('delete', change)
  this.done(change)
}

Replica.prototype.copy = function(change) {
  var p = change.db + '/' + change.id + '?revs=true&attachments=true'
  var r = url.parse(this.remoteCouch.href + p)
  r.headers = {
    accept: 'multipart/related',
    'user-agent': this.ua
  }
  var req = hh.get(r, this.onDocGet.bind(this, change))
  req.on('error', this.emit.bind(this, 'error'))
}

Replica.prototype.onDocGet = function(change, res) {
  if (res.statusCode === 404) {
    // Must have gotten deleted in the meantime
    return this.done(change)
  }

  if (res.statusCode !== 200) {
    var er = new Error('Error fetching doc')
    er.href = this.remoteCouch.href + change.db + '/' + change.id
    er.statusCode = res.statusCode
    return this.emit('error', er)
  }

  var p = change.db + '/' + change.id + '?new_edits=false'
  var r = url.parse(this.localCouch.href + p)
  r.headers = {
    'content-encoding': res.headers['content-encoding'] || '',
    'content-type': res.headers['content-type'] || '',
    'content-length': res.headers['content-length'] || '',
    'user-agent': this.u || '',
  }
  r.method = 'PUT'
  var req = hh.request(r, parse(this.onDocPut.bind(this, change)))
  req.on('error', this.emit.bind(this, 'error'))
  res.pipe(req)
}

Replica.prototype.onDocPut = function(change, er, data, res) {
  if (er)
    return this.emit('error', er)
  change.response = data
  this.emit('put', change)
  this.done(change)
}

Replica.prototype.done = function(change) {
  var sf = this.seqFiles[change.db]
  if (change.seq > sf)
    sf.seq = change.seq
  if (!this.pending[change.db])
    sf.save()

  this.emit('success', change)
  this.follows[change.db].resume()
}

Replica.prototype.ddoc = function(change) {
  // let the replication keep running in the background for documents
  // But, don't put the design doc into the DB until we've synced all the
  // mrview data for that database.
  // If another change for this ddoc is already pending, kill it.
  var k = change.db + '/' + change.id
  if (this.rsyncs[k]) {
    this.rsyncs[k].CANCELLED = true
    this.rsyncs[k].kill()
  }

  this.rsync(change)
}

Replica.prototype.rsync = function(change) {
  // rsync -e "ssh -i {sshKey}" -z -r \
  //   "{remoteUser}@{remoteHost}:{remoteViewIndexDir}/.{db}_design" \
  //   "{localViewIndexDir}/.{db}_design" \
  //   --progress --stats
  var k = change.db + '/' + change.id
  var ssh = 'ssh -i ' + this.sshKey + ' -o StrictHostKeyChecking=no'
  var rUser = this.remoteUser
  var rHost = this.remoteHost
  var rVID = this.remoteViewIndexDir
  var db = change.db
  var remote = rUser + '@' + rHost + ':' + rVID + '/.' + db + '_design'
  var lVID = this.localViewIndexDir
  var local = lVID + '/.' + db + '_design'
  var args = [
    '-e', ssh,
    '-z', '-r',
    remote,
    local,
    '--stats'
  ]

  var rsync = execFile('rsync', args, this.onRsync.bind(this, change))
  change.rsync = this.rsyncs[k] = rsync

  // Mark that we have something waiting, so that if it fails, we can
  // start over at this point in the seq file, instead of saving a higher
  // number and maybe missing it.
  this.pending[change.db] = this.pending[change.db] || 0
  this.pending[change.db] += 1
}

Replica.prototype.onRsync = function(change, er, stdout, stderr) {
  var rsync = change.rsync

  // Cancelled it because another change to the same ddoc encountered
  if (rsync.CANCELLED && er && er.killed && er.signal === 'SIGTERM')
    return

  if (er) {
    // A valid failure case is if there are no views for that remote
    // design doc.  In that case, we'll get a failure like:
    //
    // rsync: link_stat "/var/couch/._users_design" failed: No such 
    // file or directory (2)
    var ok = 'rsync: link_stat ' +
             JSON.stringify(this.remoteViewIndexDir + '/.' +
                            change.db + '_design') +
             ' failed: No such file or directory'
    if (stderr.split(ok).length > 1)
      er = null
    else {
      er.stdout = stdout
      er.stderr = stderr
      er.change = change
      return this.emit('error', er)
    }
  }

  this.pending[change.db] -= 1
  if (this.pending[change.db] === 0)
    delete this.pending[change.db]

  this.emit('rsync', change, stdout, stderr)

  this.copy(change)
}

Replica.prototype.destroy = function() {
  if (this.follows) {
    for (var db in this.follows)
      this.follows[db].die()
  }
}

