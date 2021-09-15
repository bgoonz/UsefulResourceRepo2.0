'use strict';

/* deps: mocha */
var assert = require('assert');
var reset = require('./');

describe('reset', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(reset('string'), '\u001b[0mstring\u001b[0m');
  });
});
