var Q = require('q');
	
var RequestResult = function() {
	this.data = null;
	this.headers = null;
	this.statusCode = null;
	this.chunks = [];
};

RequestResult.prototype = {
	pushData : function(chunk) {
		this.chunks.push(chunk);
	},

	computeData : function() {
		this.data = Buffer.concat(this.chunks);
		this.chunks = [];
	},
	
	writeResponse : function(response) {
		this.writeResponseHead(response);
		this.writeResponseData(response);
		response.end();
	},
	
	writeResponseData : function(response) {
		response.write(this.data.toString());
	},
	
	writeResponseHead : function(response) {
		response.writeHead(this.statusCode, this.headers);
	}
};

RequestResult.serialize = function(requestResult) {
	var objResult = {
		data: requestResult.data.toString(),
		headers: requestResult.headers,
		statusCode : requestResult.statusCode
	};
	
	return JSON.stringify(objResult);
};

RequestResult.unserialize = function(serializedResult) {
	var objResult = JSON.parse(serializedResult),
		requestResult = new RequestResult();
		
	requestResult.data = new Buffer(objResult.data);
	requestResult.headers = objResult.headers;
	requestResult.statusCode = objResult.statusCode;
	
	return requestResult;
};

var RequestProxy = function(originRequest, originResponse, backend) {
	this.originRequest = originRequest;
	this.originResponse = originResponse;
	this.backend = backend;
	this.backendRequest = null;
	this.backendResponse = null;
	this.result = null;
};

RequestProxy.prototype = {
	proxy : function() {
		
		var options = {
				method : this.originRequest.method,
				headers : this.originRequest.headers,
				path : this.originRequest.url
			};
		
		this.ended = false;
		this.errorState = false;
		
		this.defer = Q.defer();
		
		this.backendRequest = this.backend.request(options);
		if(typeof this.backend.options.timeout !== "undefined") {
			this.backendRequest.setTimeout(parseInt(this.backend.options.timeout) * 1000, this.onBackendTimeout.bind(this));
		}
		this.backendRequest.on("response", this.onBackendResponse.bind(this));
		this.backendRequest.once("error", this.onBackendError.bind(this));
		this.backendRequest.end();
		
		return this.defer.promise;
	},
	
	end : function() {
		if(this.ended === true) {
			return ;
		}
		
		try {
			this.originResponse.end();
			this.ended = true;
		}
		catch (e) {
			console.error("res.end error: %s", e.message);
		}
		
		if(this.errorState === false) {
			this.result.computeData();
			this.defer.resolve(this.result);
		}
	},
	
	onBackendTimeout : function() {
		this.errorState = true;
		this.backend.emit("timeout");
		
		if(this.originResponse.finished === false)
		{
			this.originResponse.writeHead(504, {
				"Content-Type": "text/plain"
			});

			this.originResponse.write('Gateway Timeout');
		}
		this.end();
		this.defer.reject("timeout");
	},
	
	onBackendError : function(error) {
		this.errorState = true;
		this.backend.emit("error", error);
		
		if(this.originResponse.finished === false)
		{
			this.originResponse.writeHead(502, {
				"Content-Type": "text/plain"
			});

			this.originResponse.write('Bad Gateway');
		}
		
		this.end();
		this.defer.reject(error);
	},
	
	onBackendResponse : function(backendResponse) {
		
		var self = this;
		
		this.backendResponse = backendResponse;
		this.result = new RequestResult();
		this.result.headers = backendResponse.headers;
		this.result.statusCode = this.backendResponse.statusCode;
		
		// handle headers
		
		this.originResponse.writeHead(this.result.statusCode, this.result.headers);
		
		// 304 case
		
	    if (this.originResponse.statusCode === 304) {
			return this.end();
	    }
		
		// data / drain system
		
	    this.backendResponse.on("data", function(chunk) {
			if(self.originResponse.writable === true) {
				if(self.originResponse.write(chunk) === true) {
					self.result.pushData(chunk);
				}
				else {
					self.backendResponse.pause();
				}
			}
		});
		
		this.originResponse.on("drain", function() {
			if(self.backendResponse.readable === true) {
				self.backendResponse.resume();
			}
		});
		
		// close / end
		
	    this.backendResponse.on("close", this.end.bind(this));
		this.backendResponse.on("end", this.end.bind(this));
	}
};

exports.RequestProxy = RequestProxy;
exports.RequestResult = RequestResult;