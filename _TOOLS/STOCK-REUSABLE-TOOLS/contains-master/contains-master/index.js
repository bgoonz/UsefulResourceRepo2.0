/**
 * Checks whether the element `el` is in the array `arr`
 */
module.exports = function (arr, el) {
  if ('string' === typeof arr) return !!~arr.indexOf(el)

  var i = 0
    , len = arr.length >>> 0

  while (i < len) {
    if (el === arr[i++]) {
      return true
    }
  }

  return false
}
