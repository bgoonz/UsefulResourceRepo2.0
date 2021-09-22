'use strict';

/* deps: mocha */
var assert = require('assert');
var blue = require('./');

describe('blue', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(blue('string'), '\u001b[34mstring\u001b[39m');
  });
});
