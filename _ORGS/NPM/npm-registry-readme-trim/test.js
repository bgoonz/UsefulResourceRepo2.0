var trim = require('./')
var long = new Array(1024 * 1024).join('kinda long readme, dude.\n')
var short = long.slice(0, 64 * 1024)
var doc = {
  name: 'foo',
  readme: 'this is my readme',
  readmeFilename: 'readme.txt',
  'dist-tags': { latest: '1.2.3' },
  versions: {
    '1.2.3': {
      readme: long,
      readmeFilename: 'readme.md'
    },
    '0.0.0': {
      readme: 'just some old version',
      readmeFilename: 'nope'
    }
  }
}
var expect = {
  name: 'foo',
  readme: short,
  readmeFilename: 'readme.md',
  'dist-tags': { latest: '1.2.3' },
  versions: {
    '1.2.3': {},
    '0.0.0': {}
  }
}
var assert = require('assert')

assert(trim(doc), 'should make changes')
assert.deepEqual(doc, expect, 'should trim')
console.log('ok')
