'use strict';

/* deps: mocha */
var assert = require('assert');
var bgcyan = require('./');

describe('bgcyan', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(bgcyan('string'), '\u001b[46mstring\u001b[49m');
  });
});
