'use strict'

var fs = require('fs')
var test = require('tape')
var cssLess = require('..')

test('css-less', function (t) {
  t.plan(1)

  t.equal(cssLess(fixture('input.css')), fixture('output.less'))
})

function fixture (file) {
  return fs.readFileSync('test/fixtures/' + file, 'utf8')
}
