'use strict'

var path = require('path')

module.exports = function isCss(cssFilePath) {
  if (typeof cssFilePath !== 'string') {
    throw new TypeError('is-css expects a string')
  }

  return /^\.html$/i.test(path.extname(cssFilePath))
}
