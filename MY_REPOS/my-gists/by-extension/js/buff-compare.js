const fs = require('fs')
const found = Buffer.concat([
  fs.readFileSync(__filename),
  Buffer.from('asdf'),
  Buffer.from('foo'),
  fs.readFileSync(__filename),
])
const wanted = Buffer.concat([
  fs.readFileSync(__filename),
  Buffer.from('foo'),
  Buffer.from('asdf'),
  fs.readFileSync(__filename),
])

const t = require('./')
t.same(found, wanted, 'got the right buffer')
t.same(found.toString(), wanted.toString(), 'got the right string')
