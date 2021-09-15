/*!
 * arr-filter <https://github.com/jonschlinkert/arr-filter>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var assert = require('assert');
var path = require('path');
var filter = require('./');

describe('filter:', function () {
  it('should filter strings from the array:', function () {
    var actual = filter(['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'], function (ele) {
      return typeof ele === 'string';
    });
    assert.deepEqual(actual, ['a', 'b', 'c']);
  });

  it('should filter objects:', function () {
    var actual = filter(['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'], function (ele) {
      return typeof ele === 'object';
    });
    assert.deepEqual(actual, [{a: 'b'}, {c: 'd'}]);
  });

  it('should filter strings:', function () {
    function ext(extension) {
      return function(fp) {
        return path.extname(fp) === extension;
      };
    }

    assert.deepEqual(filter(['a/b/c.js', 'a/b/c.css'], ext('.css')), ['a/b/c.css']);
    assert.deepEqual(filter(['a/b/c.js', 'a/b/c.css'], ext('.js')), ['a/b/c.js']);
  });

  it('should throw an error when the callback is not a function', function () {
    assert.throws(function() {
      filter(['a/b/c.js', 'a/b/c.css']);
    }, /expected callback to be a function/);
  });
});
