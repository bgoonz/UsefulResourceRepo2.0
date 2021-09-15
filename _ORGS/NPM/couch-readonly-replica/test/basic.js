var test = require('tap').test
var R = require('../')

test('basic', function(t) {
  var expect = [
    '1 CHANGE _users/_design/_auth',
    '1 CHANGE registry/_design/test',
    '2 CHANGE registry/test-package',
    '2 PUT registry/test-package',
    '1 RSYNC _users/_design/_auth',
    '1 RSYNC registry/_design/test',
    '1 PUT _users/_design/_auth',
    '1 PUT registry/_design/test'
  ].reduce(function(s, k) {
    s[k] = (s[k] || 0) + 1
    return s
  }, {})

  function on (ev) { return function(c) {
    var k = c.seq + ' ' + ev + ' ' + c.db + '/' + c.id
    t.ok(expect[k])
    expect[k]--
    if (expect[k] === 0)
      delete expect[k]

    if (Object.keys(expect).length === 0) {
      r.destroy()
      t.end()
    }
  }}

  var r = new R({
    remoteCouch: 'http://admin:admin@localhost:15984/',
    localCouch: 'http://admin:admin@localhost:15985/',
    sshKey: '~/.ssh/id_rsa',
    remoteUser: process.env.USER,
    remoteHost: 'localhost',
    seqFile: __dirname + '/fixtures/1/seq'
  })
  r.on('error', function(er) {
    throw er
  })
  .on('change', on('CHANGE'))
  .on('delete', on('DELETE'))
  .on('put', on('PUT'))
  .on('rsync', on('RSYNC'))
})
