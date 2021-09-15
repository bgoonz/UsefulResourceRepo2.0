/*!
 * array-every <https://github.com/jonschlinkert/array-every>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

/* deps: mocha */
var should = require('should');
var every = require('./');

describe('every', function () {
  it('should return true if every element array is truthy:', function () {
    every(['a', 'b', 'c'], function (ele) {
      return ele === 'a';
    }).should.be.false;

    every(['a', 'a', 'a'], function (ele) {
      return ele === 'a';
    }).should.be.true;
  });
});
