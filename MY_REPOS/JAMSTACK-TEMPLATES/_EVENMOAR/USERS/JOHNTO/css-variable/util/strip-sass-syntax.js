'use strict'

module.exports = function stripSassSyntax (variable) {
  return variable.replace(/^\$/, '')
}
