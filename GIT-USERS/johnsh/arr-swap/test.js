'use strict';

require('mocha');
var assert = require('assert');
var swap = require('./');

describe('arr-swap', function() {
  it('should export a function', function() {
    assert.equal(typeof swap, 'function');
  });

  it('should swap two array elements from indices', function() {
    var fixture = ['a', 'b', 'c'];
    assert.deepEqual(swap(fixture, 0, 1), ['b', 'a', 'c']);
  });

  it('should swap array elements', function() {
    assert.deepEqual(swap(['a', 'b', 'c'], 'a', 'b'), ['b', 'a', 'c']);
    var a = {a: 'a'};
    var b = {b: 'b'};
    var c = {c: 'c'};
    var fixture = [a, b, c];
    var expected = [b, a, c];
    assert.deepEqual(swap(fixture, a, b), expected);
  });

  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      swap();
    });
  });
});
