'use strict'

module.exports = function stripCustomPropertySyntax (variable) {
  return variable.replace(/^--/, '').replace(/^var\(--/, '').replace(/\)$/, '')
}
