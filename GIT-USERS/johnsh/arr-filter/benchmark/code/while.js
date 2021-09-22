'use strict';

module.exports = function filter(arr, cb) {
  var len = arr.length;
  var res = [];
  var i = 0;

  while (len--) {
    var ele = arr[i++];

    if (cb(ele, i, arr)) {
      res.push(ele);
    }
  }
  return res;
};