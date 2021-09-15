/*!
 * add less import
 *
 * Copyright (c) 2014 add less import, contributors
 * Licensed under the MIT License (MIT)
 */

var fs = require('fs');
var expect = require('chai').expect;
var addLessImport = require('../');


var fixture = function(filename) {
  var dir = 'test/fixtures/' + filename + '.less';
  return fs.readFileSync(dir, 'utf8');
};

var expectedFile = function(filename) {
  var dir = 'test/expected/' + filename + '.less';
  return fs.readFileSync(dir, 'utf8');
};


describe('when a.less is added the mixins section:', function () {
  it('should convert foo to bar.', function () {
    var actual = addLessImport(fixture('test'), 'a', 'mixins');
    var expected = /a\.less/.test(actual);
    expect(expected).to.eql(true);
  });
});

describe('when b.less is added the Components section:', function () {
  it('should be added after a.less.', function () {
    var actual = addLessImport(fixture('b'), 'b', 'Components');
    var expected = /a.+\s*.+b/.test(actual);
    expect(expected).to.eql(true);
  });
});

describe('when a.less is added to a section where a.less already exists:', function () {
  it('should not add a.less.', function () {
    var actual = addLessImport(fixture('a'), 'a', 'foo');
    var expected = expectedFile('a');
    expect(actual).to.eql(expected);
  });
});