var CacheControl = function(value, options) {
	this.cache = true;
	
	if(typeof value !== "undefined") {
		this.parseValue(value);
	}
	
	if(typeof this.ttl === "undefined") {
		if(typeof options !== "undefined"
		&& typeof options.defaultTTL !== "undefined") {
			this.ttl = parseInt(options.defaultTTL);
		}
		else {
			this.ttl = 120;
		}
	}
};

CacheControl.prototype = {
	parseValue : function(value) {
		if(/private/i.test(value) === true || /no-cache/i.test(value) === true) {
			this.cache = false;
		}
		
		if(this.cache === true) {
			var smaxAgeMatches = value.match(/s-max-age=(\d+)/i),
				maxAgeMatches = value.match(/max-age=(\d+)/i);
				
			if(smaxAgeMatches !== null) {
				this.maxAge = "s-max-age";
				this.ttl = parseInt(smaxAgeMatches[1]);
			}
			else if(maxAgeMatches !== null) {
				this.maxAge = "max-age";
				this.ttl = parseInt(maxAgeMatches[1]);
			}
		}
	},
	updateHeaders : function(headers, options) {
		if(typeof headers["cache-control"] === "undefined") {
			headers["cache-control"] = "public," + this.maxAge + "=" + ttl;
		}
		else {
			if(
				(this.maxAge === "s-max-age"
				&& (typeof options === "undefined"
					|| (typeof options.reportSMaxAge === "undefined"
						|| options.reportSMaxAge === true)
					)
				)
				|| (this.maxAge === "max-age"
				&& (typeof options !== "undefined"
					&& typeof options.reportMaxAge !== "undefined"
					&& options.reportMaxAge === true)
				)
			) {
				var regexp = new RegExp(this.maxAge + "=(\\d+)", "i");
				headers["cache-control"] = headers["cache-control"].replace(regexp, this.maxAge + "=" + this.ttl);
			}
		}
	}
};

CacheControl.createFromHeaders = function(headers, options) {
	var value = "";
		
	if(typeof headers["cache-control"] !== "undefined") {
		value = headers["cache-control"];
	}
	else if(typeof headers["pragma"] !== "undefined" && headers["pragma"] === "no-cache") {
		value = "no-cache";
	}
	
	return new CacheControl(value, options);
};

exports.CacheControl = CacheControl;