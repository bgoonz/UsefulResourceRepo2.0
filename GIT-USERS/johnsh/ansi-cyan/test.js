'use strict';

/* deps: mocha */
var assert = require('assert');
var cyan = require('./');

describe('cyan', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(cyan('string'), '\u001b[36mstring\u001b[39m');
  });
});
