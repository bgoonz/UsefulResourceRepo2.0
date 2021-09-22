'use strict';

/* deps: mocha */
var assert = require('assert');
var yellow = require('./');

describe('yellow', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(yellow('string'), '\u001b[33mstring\u001b[39m');
  });
});
