'use strict'

module.exports = function isLessVariable (variable) {
  return /^@/.test(variable)
}
