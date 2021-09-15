var Q = require("q"),
	url = require("url"),
	RequestResult = require("../request").RequestResult,
	CacheControl = require("./cache-control").CacheControl;

var CacheManager = function(database, options) {
	if(typeof options === "undefined") {
		options = {};
	}
	
	this.db = database;
	this.options = options;
};

CacheManager.prototype = {
	computeKey : function(request) {
		if(typeof this.options.ignoreQueryString === "boolean"
		&& this.options.ignoreQueryString === true) {
			return url.parse(request.url).pathname;
		}
		
		return request.url;
	},
	
	computeCacheControl : function(result) {
		return CacheControl.createFromHeaders(result.headers, this.options);
	},
	
	cache : function(request, result) {
		var self = this,
			defer = Q.defer();
		
		// to remove
		var cacheControl = self.computeCacheControl(result);
		
		if(cacheControl.cache === true) {
			this.db.init().then(function() {
				var key = self.computeKey(request),
					data = RequestResult.serialize(result);

				self.db.set(key, data, cacheControl.ttl).then(defer.resolve);
			},
			defer.reject);
		}
		else {
			defer.reject();
		}
		
		return defer.promise;
	},
	
	get : function(request) {
		var self = this,
			defer = Q.defer();
			
		this.db.init().then(function() {
			var key = self.computeKey(request);
			
			self.db.get(key).then(function(res) {
				if(res.data) {
					var result = RequestResult.unserialize(res.data),
						cacheControl = self.computeCacheControl(result);
					
					cacheControl.ttl = res.ttl;
					cacheControl.updateHeaders(result.headers, self.options);
					
					defer.resolve(result);
				}
				else {
					defer.reject();
				}
			},
			defer.reject);
		},
		defer.reject);
		
		return defer.promise;
	}
};

exports.CacheManager = CacheManager;