'use strict';

/* deps: mocha */
var assert = require('assert');
var bgblue = require('./');

describe('bgblue', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(bgblue('string'), '\u001b[44mstring\u001b[49m');
  });
});
