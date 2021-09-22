'use strict';

/* deps: mocha */
var assert = require('assert');
var bold = require('./');

describe('bold', function () {
  it('should wrap a string with ansi styling:', function () {
    assert.equal(bold('string'), '\u001b[1mstring\u001b[22m');
  });
});
