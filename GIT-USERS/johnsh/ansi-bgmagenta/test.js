'use strict';

/* deps: mocha */
var assert = require('assert');
var bgmagenta = require('./');

describe('bgmagenta', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(bgmagenta('string'), '\u001b[45mstring\u001b[49m');
  });
});
