'use strict'

module.exports = function isCustomProperty (variable) {
  return /^--/.test(variable) || /^var\(--.+\)$/.test(variable)
}
