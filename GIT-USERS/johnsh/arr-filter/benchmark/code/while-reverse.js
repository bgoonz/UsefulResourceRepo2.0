'use strict';

module.exports = function filter(arr, cb) {
  var len = arr.length;
  var res = [];
  var i = 0;

  while (len--) {
    var ele = arr[len];

    if (cb(ele)) {
      res.push(ele);
    }
  }
  return res;
};