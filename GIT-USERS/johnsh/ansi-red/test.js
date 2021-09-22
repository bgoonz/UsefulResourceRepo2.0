'use strict';

/* deps: mocha */
var assert = require('assert');
var red = require('./');

describe('red', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(red('string'), '\u001b[31mstring\u001b[39m');
  });
});
