'use strict'

var isBlank = require('is-blank')

var isCustomProperty = require('./util/is-custom-property')
var isSassVariable = require('./util/is-sass-variable')
var isLessVariable = require('./util/is-less-variable')

var stripCustomPropertySyntax = require('./util/strip-custom-property-syntax')
var stripSassSyntax = require('./util/strip-sass-syntax')
var stripLessSyntax = require('./util/strip-less-syntax')

var CssVariable = function (variable) {
  if (variable instanceof CssVariable) {
    return variable
  }

  if (!(this instanceof CssVariable)) {
    return new CssVariable(variable)
  }

  if (typeof variable !== 'string' || isBlank(variable)) {
    throw new TypeError('css-variable expected a string')
  }

  this.variable = variable

  if (this.isCustomProperty()) {
    this.variableBase = this.stripCustomPropertySyntax()
  } else if (this.isSassVariable()) {
    this.variableBase = this.stripSassSyntax()
  } else if (this.isLessVariable()) {
    this.variableBase = this.stripLessSyntax()
  } else {
    this.variableBase = this.variable
  }
}


CssVariable.prototype = {
  isCustomProperty: function (variable) {
    return isCustomProperty(variable || this.variable)
  },
  isSassVariable: function (variable) {
    return isSassVariable(variable || this.variable)
  },
  isLessVariable: function (variable) {
    return isLessVariable(variable || this.variable)
  },
  stripCustomPropertySyntax: function (variable) {
    return stripCustomPropertySyntax(variable || this.variable)
  },
  stripSassSyntax: function (variable) {
    return stripSassSyntax(variable || this.variable)
  },
  stripLessSyntax: function (variable) {
    return stripLessSyntax(variable || this.variable)
  },
  base: function () {
    return this.variableBase
  },
  css: function () {
    return '--' + this.variableBase
  },
  cssDecl: function () {
    return this.css()
  },
  cssFunc: function () {
    return 'var(--' + this.variableBase + ')'
  },
  cssVal: function () {
    return this.cssFunc()
  },
  sass: function () {
    return '$' + this.variableBase
  },
  scss: function () {
    return this.sass()
  },
  less: function () {
    return '@' + this.variableBase
  },
  stylus: function () {
    return this.variableBase
  }
}

module.exports = CssVariable
