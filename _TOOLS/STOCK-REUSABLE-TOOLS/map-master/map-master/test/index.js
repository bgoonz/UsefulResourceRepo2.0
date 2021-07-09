
try {
  var map = require('map');
} catch (e) {
  var map = require('..');
}

var assert = require('assert');

describe('map', function () {
  it('should map an array', function () {
    var arr = [1, 2, 3];
    var ret = map(arr, function (val, i) {
      return 10 + val;
    });
    assert(11 === ret[0]);
    assert(12 === ret[1]);
    assert(13 === ret[2]);
  });

  it('should map an object', function () {
    var obj = { a: 1, b: 2, c: 3 };
    var ret = map(obj, function (key, val) {
      return 10 + val;
    });
    assert(11 === ret[0]);
    assert(12 === ret[1]);
    assert(13 === ret[2]);
  });
});