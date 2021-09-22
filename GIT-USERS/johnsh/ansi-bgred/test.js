'use strict';

/* deps: mocha */
var assert = require('assert');
var bgred = require('./');

describe('bgred', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(bgred('string'), '\u001b[41mstring\u001b[49m');
  });
});
