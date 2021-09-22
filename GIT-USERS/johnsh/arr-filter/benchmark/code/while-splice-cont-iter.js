'use strict';

var iterator = require('make-iterator');

module.exports = function filter(arr, cb, thisArg) {
  cb = iterator(cb, thisArg);
  var len = arr.length;

  while (len--) {
    if (cb(arr[len])) {
      continue;
    }
    arr.splice(len, 1);
  }

  return arr;
};