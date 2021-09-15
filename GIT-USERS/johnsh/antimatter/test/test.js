/*
 * antimatter
 * https://github.com/jonschlinkert/antimatter
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var path = require('path');

// node_modules
var expect = require('chai').expect;
var file = require('fs-utils');

var antimatter = require('../');


describe('antimatter:', function () {
  it('should obliterate YAML front matter causing the wormhole in the gamma quadrant to collapse for all eternity.', function () {
    var actual = antimatter('./test/fixtures/default.md');
    var expected = '# This shouldn\'t be removed.';
    expect(actual).to.eql(expected);
  });

  it('should obliterate YAML front matter causing the wormhole in the gamma quadrant to collapse for all eternity.', function () {
    var actual = antimatter('./test/fixtures/custom.md', {open: '~~~', close: '~~~'});
    var expected = '# This shouldn\'t be removed.';
    expect(actual).to.eql(expected);
  });
});