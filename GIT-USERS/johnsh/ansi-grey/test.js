'use strict';

/* deps: mocha */
var assert = require('assert');
var grey = require('./');

describe('grey', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(grey('string'), '\u001b[90mstring\u001b[39m');
  });
});
