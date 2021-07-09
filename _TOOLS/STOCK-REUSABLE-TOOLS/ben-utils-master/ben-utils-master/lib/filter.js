module.exports = function (func, arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      result.push(arr[i])
    }
  }
  return result
}
