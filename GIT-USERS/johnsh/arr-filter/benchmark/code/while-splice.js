'use strict';

module.exports = function filter(arr, cb) {
  var len = arr.length;

  while (len--) {
    if (!cb(arr[len])) {
      arr.splice(len, 1);
    }
  }

  return arr;
};