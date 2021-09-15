var fs = require('fs');
var assert = require('assert');
var cssIntersection = require('..');

describe('css-intersection', function() {

  it('should do something awesome', function() {
    assert.equal(cssIntersection(fixture('a.css'), fixture('b.css')), fixture('a-b.css'));
  });
});

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}
