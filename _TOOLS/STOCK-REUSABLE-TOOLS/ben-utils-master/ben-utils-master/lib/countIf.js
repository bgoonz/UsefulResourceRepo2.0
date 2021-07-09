module.exports = function (testFunc, arr) {
  var result = arr.filter(testFunc)
  return result.length
}
