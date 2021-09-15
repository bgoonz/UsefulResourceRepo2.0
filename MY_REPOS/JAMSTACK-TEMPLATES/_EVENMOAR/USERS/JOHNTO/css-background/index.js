'use strict'

var cssColorList = require('css-color-list')
var rgbaRegex = require('rgba-regex')
var rgbRegex = require('rgb-regex')
var hslaRegex = require('hsla-regex')
var hslRegex = require('hsl-regex')

// <bg-image> || <position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box> || <background-color>

module.exports = function cssBackground(backgroundValue) {
  if (typeof backgroundValue != 'string') {
    throw new TypeError('css-background expected a string')
  }

  var backgroundAttachmentRegex = '(scroll|fixed|local|inherit)?\\s*'
  var backgroundClipRegex = '(border-box|padding-box|content-box|inherit)?\\s*'
  var backgroundImageRegex = '(none|inherit|url\\(.*\\))?\\s*'

  var backgroundRepeatValues = ['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'space', 'round', 'inherit'].join('|')
  var backgroundRepeatRegex = '((' + backgroundRepeatValues + ')?\\s+(' + backgroundRepeatValues + ')?)?\\s*'

  var colorListRegex = cssColorList().join('|')
  var rgbOrRgbaRegex = rgbRegex().source + '|' + rgbaRegex().source
  var hslOrHslaRegex = hslRegex().source + '|' + hslaRegex().source
  var hexRegex = '#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?'

  var cssColorRegex = '(' + [
    colorListRegex,
    rgbOrRgbaRegex,
    hslOrHslaRegex,
    hexRegex
  ].join('|') + ')'

  var baseBackgroundRegex = [
    backgroundImageRegex,
    backgroundRepeatRegex,
    backgroundAttachmentRegex,
    backgroundClipRegex,
    cssColorRegex
  ].join('')

  var cssBackgroundRegex = new RegExp('^\\s*' + baseBackgroundRegex, 'i')
  var parsedResults = cssBackgroundRegex.exec(backgroundValue)
  var results = {}

  if (!parsedResults) { return results }
  if (parsedResults[1] !== 'undefined') { results.image = parsedResults[1]      }
  if (parsedResults[2] !== 'undefined') { results.attachment = parsedResults[2] }
  if (parsedResults[3] !== 'undefined') { results.clip = parsedResults[3]       }
  if (parsedResults[4] !== 'undefined') { results.color = parsedResults[4]      }
  return results
}
