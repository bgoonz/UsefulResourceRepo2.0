'use strict'

module.exports = function isSassVariable (variable) {
  return /^\$/.test(variable)
}
