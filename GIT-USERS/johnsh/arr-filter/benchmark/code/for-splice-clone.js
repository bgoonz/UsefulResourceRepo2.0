'use strict';

module.exports = function filter(arr, cb) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    if (!cb(arr[i])) {
      arr.splice(i, 1);
    }
  }

  return arr;
};