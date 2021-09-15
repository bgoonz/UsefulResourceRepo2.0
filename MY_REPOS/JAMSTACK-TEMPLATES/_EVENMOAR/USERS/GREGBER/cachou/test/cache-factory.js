var cacheFactory = require('../lib/cache-factory');
var Cache = require('../lib/cache');
var expect = require('chai').use(require('sinon-chai')).expect;

describe('Cache factory', function () {
  it('should create a new cache', function () {
    var cache = cacheFactory();
    expect(cache).to.be.instanceOf(Cache);
  });
});