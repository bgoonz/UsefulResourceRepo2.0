/*!
 * array-initial <https://github.com/jonschlinkert/array-initial>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var initial = require('./');

describe('initial', function () {
  it('should throw an error if the value passed is not an array:', function () {
    (function () {
      initial();
    }).should.throw('array-initial expects an array as the first argument.');
  });

  it('should return all but the last element in the array:', function () {
    initial(['a', 'b', 'c', 'd', 'e', 'f']).should.eql(['a', 'b', 'c', 'd', 'e']);
    initial(['a', 'b', 'c', 'd', 'e', 'f'], 1).should.eql(['a', 'b', 'c', 'd', 'e']);
  });

  it('should all but the last n elements in the array:', function () {
    initial(['a', 'b', 'c', 'd', 'e', 'f'], 2).should.eql(['a', 'b', 'c', 'd']);
  });
});

