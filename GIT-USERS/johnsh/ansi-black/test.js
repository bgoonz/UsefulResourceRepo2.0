'use strict';

/* deps: mocha */
var assert = require('assert');
var black = require('./');

describe('black', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(black('string'), '\u001b[30mstring\u001b[39m');
  });
});
