'use strict';

/* deps: mocha */
var assert = require('assert');
var italic = require('./');

describe('italic', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(italic('string'), '\u001b[3mstring\u001b[23m');
  });
});
