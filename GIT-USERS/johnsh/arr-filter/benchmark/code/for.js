'use strict';

module.exports = function filter(arr, cb) {
  var len = arr.length;
  var res = [];

  for (var i = 0; i < len; i++) {
    var ele = arr[i];

    if (cb(ele, i)) {
      res.push(ele);
    }
  }
  return res;
};