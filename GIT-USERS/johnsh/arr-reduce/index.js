/*!
 * arr-reduce <https://github.com/jonschlinkert/arr-reduce>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function reduce(arr, cb, initial) {
  // idea for args length to ensure initial value from github.com/mout/mout
  var init = arguments.length > 2;
  if (arr == null) {
    if (init) {
      return initial;
    } else {
      throw new Error('arr-reduce expects an array or initial value');
    }
  }

  var len = arr.length, res = initial;
  if (!arr.length) return initial;

  for (var i = 0; i < len; i++) {
    if (!init) {
      res = arr[i];
      init = true;
    } else {
      res = cb(res, arr[i], i, arr);
    }
  }
  return res;
};
