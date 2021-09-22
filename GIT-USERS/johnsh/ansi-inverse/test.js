'use strict';

/* deps: mocha */
var assert = require('assert');
var inverse = require('./');

describe('inverse', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(inverse('string'), '\u001b[7mstring\u001b[27m');
  });
});
