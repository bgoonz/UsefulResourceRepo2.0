'use strict'

var postcss = require('postcss')
var isCssRoot = require('is-css-root')
var cssVariable = require('css-variable')
var isComputedProperty = require('css-variable/util/is-custom-property')

module.exports = function cssLess (css) {
  if (typeof css !== 'string') {
    throw new TypeError('css-less expected a string')
  }

  var root = postcss().process(css).root
  var variables = []

  root.walkRules(function (rule) {
    if (isCssRoot(rule.selector)) {
      rule.walkDecls(function (decl) {
        if (isComputedProperty(decl.prop)) {
          variables.push({
            prop: decl.prop,
            val: decl.value
          })
        }
      })
      rule.remove()
    } else {
      rule.walkDecls(function (decl) {
        if (isComputedProperty(decl.value)) {
          decl.value = cssVariable(decl.value).less()
        }
      })
    }
  })

  var less = postcss().process(root).css
  var variablesAsString = variables.map(function (variable) {
    return cssVariable(variable.prop).less() + ': ' + variable.val + ';'
  })

  return variablesAsString + '\n\n' + less
}
