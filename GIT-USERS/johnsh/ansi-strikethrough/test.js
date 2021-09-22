'use strict';

/* deps: mocha */
var assert = require('assert');
var strikethrough = require('./');

describe('strikethrough', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(strikethrough('string'), '\u001b[9mstring\u001b[29m');
  });
});
