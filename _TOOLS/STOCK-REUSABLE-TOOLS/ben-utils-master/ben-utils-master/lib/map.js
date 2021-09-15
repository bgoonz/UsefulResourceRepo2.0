  module.exports = function (func, arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result.push(func(arr[i]))
  }
  return result
}
