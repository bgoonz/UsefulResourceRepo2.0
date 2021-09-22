'use strict';

/* deps: mocha */
var assert = require('assert');
var bgyellow = require('./');

describe('bgyellow', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(bgyellow('string'), '\u001b[43mstring\u001b[49m');
  });
});
