var cache_manager = require('cache-manager');
var Memcached = require('memcached');

var memcached = new Memcached(process.env.CACHE_SERVERS.split(","), {});
var LIFETIME = parseInt(process.env.CACHE_LIFETIME || 60 * 60 * 24, 10); // 1 Day

module.exports = {
    init: function() {
        this.cache = cache_manager.caching({
            store: mem_cache
        });
    },

    beforePhantomRequest: function(req, res, next) {
        if (req.method !== 'GET') {
            return next();
        }

        this.cache.get(req.prerender.url, function (err, result) {
            if (!err && result) {
                res.send(200, result);
            } else {
                next();
            }
        });
    },

    afterPhantomRequest: function(req, res, next) {
        this.cache.set(req.prerender.url, req.prerender.documentHTML, function(err) {});
        next();
    },

    beforeSend: function(req, res, next) {
      res.setHeader("Cache-Control", "public, max-age=" + LIFETIME);
      next();
    }
};

var mem_cache = {
    get: function(key, callback) {
      memcached.get(key, function(err, value) {
        var stringValue = value ? value.toString() : null;
        callback(err, stringValue);
      });
    },
    set: function(key, value, callback) {
      memcached.set(key, value, LIFETIME, callback);
    }
};
