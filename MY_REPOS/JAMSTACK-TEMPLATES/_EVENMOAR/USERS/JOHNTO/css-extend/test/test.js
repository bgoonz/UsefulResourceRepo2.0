var assert = require('assert');
var fs = require('fs');
var cssExtend = require('..');

describe('css-extend', function() {

  it('parses chained extends properly', function() {
    var output = cssExtend(fixture('a.css'));
    var expected = fixture('a.expected.css');

    assert.equal(output, expected);
  });

  it('parses extends correctly', function() {
    var output = cssExtend(fixture('b.css'));
    var expected = fixture('b.expected.css');

    assert.equal(output, expected);
  });
});

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}
