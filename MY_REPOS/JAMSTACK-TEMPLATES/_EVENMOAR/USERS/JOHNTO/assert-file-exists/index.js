'use strict'

var assert = require('assert')
var fileExists = require('file-exists')

module.exports = function assertFileExists (filePath, msgOrOpts, opts) {
  if (typeof filePath !== 'string') {
    throw new TypeError('assert-file-exists expected a string')
  }

  if (typeof msgOrOpts !== 'string') {
    opts = msgOrOpts
    msgOrOpts = 'exists'
  }

  opts = opts || {}

  var exists = fileExists(filePath)

  if (opts.skipError) {
    return exists
  }

  assert(exists, msgOrOpts)
}
