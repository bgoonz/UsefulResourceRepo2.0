'use strict'

module.exports = function stripLessSyntax (variable) {
  return variable.replace(/^@/, '')
}
