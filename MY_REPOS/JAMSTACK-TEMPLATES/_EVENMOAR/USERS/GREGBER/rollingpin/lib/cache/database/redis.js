var redis = require("redis"),
	Q = require("q");

var RedisDatabase = function(settings) {
	if(!settings) {
		settings = {};
	}
	
	this.settings = settings;
};

RedisDatabase.prototype = {
	init : function() {
		if(this.initDefer) {
			return this.initDefer.promise;
		}
		
		var self = this;
		
		this.initDefer = Q.defer();
		this.redisClient = redis.createClient(self.settings.port, self.settings.host, self.settings.options);
		
		this.redisClient.on("ready", function() {
			if(typeof self.settings.db !== "undefined") {
				self.redisClient.select(settings.db, self.initDefer.resolve);
			}
			else {
				self.initDefer.resolve();
			}
		});
		
		this.redisClient.on("error", this.initDefer.reject);
		
		return this.initDefer.promise;
	},
	
	set : function(key, value, ttl) {
		var defer = Q.defer();
		
		this.redisClient.multi()
				.set(key, value)
				.expire(key, ttl)
				.exec(function(err, replies) {
					if(err) {
						defer.reject(err);
					}
					else {
						defer.resolve();
					}
				});
		
		return defer.promise;
	},
	
	get : function(key) {
		var defer = Q.defer();
		
		this.redisClient.multi()
			.get(key)
			.ttl(key)
			.exec(function(err, replies) {
				if(err) {
					defer.reject(err);
				}
				else {
					defer.resolve({
						data : replies[0],
						ttl : replies[1]
					});
				}
			});
		
		return defer.promise;
	},
	
	getTTL : function(key) {
		var defer = Q.defer();
		
		this.redisClient.ttl(key, function(err, ttl) {
			if(err) {
				defer.reject(err);
			}
			else {
				defer.resolve(ttl);
			}
		});
		
		return defer.promise;
	},
	
	setTTL : function(key, ttl) {
		var defer = Q.defer();
		
		this.redisClient.expire(key, ttl, function(err, reply) {
			if(err) {
				defer.reject(err);
			}
			else {
				defer.resolve(reply === 1);
			}
		});
		
		return defer.promise;
	},
	
	del : function(key) {
		var defer = Q.defer();
		
		this.redisClient.del(key, function(err, reply) {
			if(err) {
				defer.reject(err);
			}
			else {
				defer.resolve(reply === 1);
			}
		});
		
		return defer.promise;
	}
};

exports.RedisDatabase = RedisDatabase;