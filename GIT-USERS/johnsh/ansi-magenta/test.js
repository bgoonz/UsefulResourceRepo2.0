'use strict';

/* deps: mocha */
var assert = require('assert');
var magenta = require('./');

describe('magenta', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(magenta('string'), '\u001b[35mstring\u001b[39m');
  });
});
