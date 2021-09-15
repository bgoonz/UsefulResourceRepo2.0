'use strict';

module.exports = function filter(arr, cb) {
  var len = arr.length;
  var res = arr.slice();

  while (len--) {
    if (!cb(arr[len])) {
      res.splice(len, 1);
    }
  }

  return res;
};