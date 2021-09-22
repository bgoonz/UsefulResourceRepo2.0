'use strict';

/* deps: mocha */
var assert = require('assert');
var hidden = require('./');

describe('hidden', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(hidden('string'), '\u001b[8mstring\u001b[28m');
  });
});
