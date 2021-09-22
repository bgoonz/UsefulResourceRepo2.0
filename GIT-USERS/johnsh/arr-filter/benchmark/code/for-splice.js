'use strict';

module.exports = function filter(arr, cb) {
  var res = arr.slice();

  for (var i = arr.length - 1; i >= 0; i--) {
    if (!cb(arr[i])) {
      res.splice(i, 1);
    }
  }

  return res;
};