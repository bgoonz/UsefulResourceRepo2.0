'use strict';

/* deps: mocha */
var assert = require('assert');
var green = require('./');

describe('green', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(green('string'), '\u001b[32mstring\u001b[39m');
  });
});
