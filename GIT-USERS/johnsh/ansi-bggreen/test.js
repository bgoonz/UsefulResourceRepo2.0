'use strict';

/* deps: mocha */
var assert = require('assert');
var bggreen = require('./');

describe('bggreen', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(bggreen('string'), '\u001b[42mstring\u001b[49m');
  });
});
