/*
 * antimatter
 * https://github.com/jonschlinkert/antimatter
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var yfm = require('yfm');

module.exports = function (src, options) {
  return yfm(src, options).content.replace(/^\s+/, '');
};