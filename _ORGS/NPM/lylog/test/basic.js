var test = require('tap').test
var lylog = require('../lylog.js')
var server = lylog({
  token: 'fooblz',
  host: 'localhost',
  port: 10515
})

var net = require('net')
var fs = require('fs')
var mock = net.createServer()

var send = fs.readFileSync(__dirname + '/logs.txt')
var expect = fs.readFileSync(__dirname + '/expect.txt', 'ascii')

test('setup', function(t) {
  server.listen(10514, function() {
    mock.listen(10515, function() {
      t.pass('listening')
      t.end()
    })
  })
})

test('basic', function(t) {
  console.error('basic test start')
  mock.on('connection', function(sock) {
    console.error('mock connection')
    mock.close()
    sock.setEncoding('ascii')
    var m = ''
    sock.on('data', function(c) {
      m += c
      if (m.length >= expect.length) {
        console.error('got it all')
        t.same(m.split('\n'), expect.split('\n'))
        server.close(function() {
          t.pass('closed')
          t.end()
        })
      }
    })
  })
  var upstream = net.connect({ port: 10514 })
  upstream.end(send)
})
