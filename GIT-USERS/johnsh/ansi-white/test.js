'use strict';

/* deps: mocha */
var assert = require('assert');
var white = require('./');

describe('white', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(white('string'), '\u001b[37mstring\u001b[39m');
  });
});
