var redis = require('redis');
var sinon = require('sinon');
var async = require('async');
var expect = require('chai').use(require('sinon-chai')).expect;
var Cache = require('../lib/cache');

describe('Cache', function () {
  var createCache, cache;

  beforeEach(function () {
    createCache = function createCache(options) {
      return new Cache(options || {});
    };
  });

  afterEach(function () {
    if (cache) cache.close();
  });

  describe('constructor', function () {
    describe('redis option', function () {
      beforeEach(function () {
        sinon.spy(redis, 'createClient');
      });

      afterEach(function () {
        redis.createClient.restore();
      });

      it('should accept nothing', function () {
        cache = createCache();
      });

      it('should accept an object', function () {
        cache = createCache({
          redis: {
            host: 'localhost',
            port: 6379,
            socket_nodelay: true
          }
        });

        expect(redis.createClient).to.be.calledWith(6379, 'localhost', { socket_nodelay: true });
      });

      it('should accept a function', function () {
        cache = createCache({
          redis: redis.createClient
        });

        expect(redis.createClient).to.be.called;
      });
    });

    describe('ttl option', function () {
      it('should convert ttl in second', function () {
        var cache = createCache({ ttl: 1001 });
        expect(cache.ttl).to.equal(2);
      });
    });

    describe('prefix option', function () {
      it('should define a prefix', function () {
        var cache = createCache({ prefix: 'myprefix:' });
        expect(cache.prefix).to.equal('myprefix:');
      });
    });
  });

  describe('#get', function () {
    it('should return a value', function (done) {
      var cache = createCache();
      cache.redis.set('cache:mykey', '{"foo":"bar"}');

      cache.get('mykey', function (err, data) {
        if (err) return done(err);
        expect(data).to.eql({ foo: 'bar' });
        done();
      });
    });
  });

  describe('#set', function () {
    it('should define a value', function (done) {
      var cache = createCache();

      async.waterfall([
        function setKey(next) {
          cache.set('mykey', { foo: 'bar' }, next);
        },
        function getKey(next) {
          cache.redis.get('cache:mykey', next);
        },
        function checkKey(value, next) {
          expect(value).to.equal('{"foo":"bar"}');
          next();
        }
      ], done);
    });

    it('should set the ttl', function (done) {
      var cache = createCache({ ttl: 5000 });

      async.waterfall([
        function setKey(next) {
          cache.set('mykey', { foo: 'bar' }, next);
        },
        function getTTL(next) {
          cache.redis.ttl('cache:mykey', next);
        },
        function checkTTL(value, next) {
          expect(value).to.be.most(5);
          next();
        }
      ], done);
    });

    it('should do nothing if ttl is equal to 0', function (done) {
      var cache = createCache({ ttl: 0 });

      async.waterfall([
        function setKey(next) {
          cache.set('otherkey', { foo: 'bar' }, next);
        },
        function exists(next) {
          cache.redis.exists('cache:otherkey', next);
        },
        function checkExists(exists, next) {
          expect(exists).to.equal(0);
          next();
        }
      ], done);
    });

    it('should not specify TTL is ttl is null', function (done) {
      var cache = createCache({ ttl: null });

      async.waterfall([
        function setKey(next) {
          cache.set('nottlkey', { foo: 'bar' }, next);
        },
        function getTTL(next) {
          cache.redis.ttl('cache:nottlkey', next);
        },
        function checkTTL(value, next) {
          expect(value).to.equal(-1);
          next();
        }
      ], done);
    });
  });

  describe('#del', function () {
    it('should delete key', function (done) {
      var cache = createCache();

      async.waterfall([
        function setKey(next) {
          cache.set('mykey', { foo: 'bar' }, next);
        },
        function getKey(next) {
          cache.redis.get('cache:mykey', next);
        },
        function checkKey(value, next) {
          expect(value).to.equal('{"foo":"bar"}');
          next();
        },
        function deleteKey(next) {
          cache.del('mykey', next);
        },
        function getKey(ret, next) {
          cache.redis.get('cache:mykey', next);
        },
        function checkKey(value, next) {
          expect(value).to.be.null;
          next();
        }
      ], done);
    });
  });

  describe('#delAll', function () {
    it('should delete multiple keys', function (done) {
      var cache = createCache();

      async.waterfall([
        function setKeys(next) {
          cache.redis.multi()
          .set('cache:a:key1', 'foo')
          .set('cache:a:key2', 'bar')
          .set('cache:b:key1', 'foo')
          .exec(next);
        },
        function delKeys(rets, next) {
          cache.delAll('a:*', next);
        },
        function getKeys(rets, next) {
          cache.redis.multi()
          .get('cache:a:key1')
          .get('cache:a:key2')
          .get('cache:b:key1')
          .exec(next);
        },
        function checkKey(values, next) {
          expect(values[0]).to.be.null;
          expect(values[1]).to.be.null;
          expect(values[2]).to.not.be.null;
          next();
        }
      ], done);
    });
  });
});