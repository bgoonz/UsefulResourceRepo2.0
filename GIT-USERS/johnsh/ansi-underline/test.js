'use strict';

/* deps: mocha */
var assert = require('assert');
var underline = require('./');

describe('underline', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(underline('string'), '\u001b[4mstring\u001b[24m');
  });
});
