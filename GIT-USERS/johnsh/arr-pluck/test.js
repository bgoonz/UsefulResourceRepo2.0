/*!
 * arr-pluck <https://github.com/jonschlinkert/arr-pluck>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var should = require('should');
var map = require('arr-map');
var pluck = require('./');

/**
 * Tests lifted from github.com/lodash/lodash
 */

describe('pluck', function() {
  it('should return an array of property values from each element of a collection', function() {
    var objects = [{ 'a': 'b', 'c': 'd' }, { 'a': 'f', 'c': 'e' }];
    pluck(objects, 'a').should.eql(['b', 'f']);
  });

  it('should pluck inherited property values', function() {
    function Foo() { this.a = 1; }
    Foo.prototype.b = 2;
    pluck([new Foo], 'b').should.eql([2]);
  });

  it('should return `undefined` for undefined properties', function() {
    var array = [{ 'a': 1 }];
    var actual = [pluck(array, 'b'), pluck(array, 'c')];

    actual.should.eql([[undefined], [undefined]]);
  });

  it('should take a callback function', function() {
    var objects = [{ 'a': 'b', 'c': 'd' }, { 'a': 'f', 'c': 'e' }];
    pluck(objects, function(ele, i, arr) {
      return ele['a'];
    }).should.eql(['b', 'f']);
  });
});
