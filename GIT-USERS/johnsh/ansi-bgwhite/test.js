'use strict';

/* deps: mocha */
var assert = require('assert');
var bgwhite = require('./');

describe('bgwhite', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(bgwhite('string'), '\u001b[47mstring\u001b[49m');
  });
});
