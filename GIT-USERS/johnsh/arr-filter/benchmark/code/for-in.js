'use strict';

module.exports = function filter(arr, fn) {
  var res = [];

  for (var i in arr) {
    if (fn(arr[i], +i)) {
      res.push(arr[i]);
    }
  }

  return res;
};
