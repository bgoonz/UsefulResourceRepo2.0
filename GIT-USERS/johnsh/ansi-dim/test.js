'use strict';

/* deps: mocha */
var assert = require('assert');
var dim = require('./');

describe('dim', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(dim('string'), '\u001b[2mstring\u001b[22m');
  });
});
