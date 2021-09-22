'use strict';

/* deps: mocha */
var assert = require('assert');
var bgblack = require('./');

describe('bgblack', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(bgblack('string'), '\u001b[40mstring\u001b[49m');
  });
});
