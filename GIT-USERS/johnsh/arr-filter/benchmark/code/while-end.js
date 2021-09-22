'use strict';

module.exports = function filter(arr, cb) {
  var res = [];
  var len = arr.length;
  var i = 0;

  while (len--) {
    var val = arr[len];
    if (!cb(val)) {
      continue;
    }
    res[i++] = val;
  }
  return res;
};