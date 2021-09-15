var colors = require('colors')
var emoji = require('node-emoji')
var pretty = require('js-object-pretty-print').pretty

module.exports = function (actual, expected, message) {
  var greenCheck = colors.green(emoji.get('white_check_mark'))
  var redCross = colors.red(emoji.get('x'))
  if (actual === expected) {
    console.log(greenCheck, colors.green(message))
  } else {
    console.log(redCross, colors.red(message))
    console.log('actual: ', pretty(actual))
    console.log('expected: ', pretty(expected))
  }
}
