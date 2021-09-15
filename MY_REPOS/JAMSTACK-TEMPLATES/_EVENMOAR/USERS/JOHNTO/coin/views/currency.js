const assert = require('assert')
const choo = require('choo')
module.exports = function (params, state, send) {
  return choo.view`
    <h1>Currency!</h1>
  `
}
