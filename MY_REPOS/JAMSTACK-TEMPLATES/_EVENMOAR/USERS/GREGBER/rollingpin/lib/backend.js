var http = require('http'),
	events = require('events'),
	util = require('util'),
	RequestProxy = require("./request").RequestProxy;

var Backend = function(options) {
	if(!options || typeof options !== "object") {
		throw new Error("Options is required and have to be an object");
	}
	
	events.EventEmitter.call(this);
	
	// Default port
	if(!options.port) {
		options.port = 8080;
	}
	
	// Default host
	if(!options.host) {
		options.host = 'localhost';
	}
	
	this.on("error", this.errorHandler);
	this.on("timeout", this.timeoutHandler);
	
	this.options = options;
};

util.inherits(Backend, events.EventEmitter);

Backend.prototype.errorHandler = function(error) {
	// empty handler for events
};

Backend.prototype.timeoutHandler = function() {
	// empty handler for events
};

Backend.prototype.request = function(options) {
	if(!options) {
		options = {};
	}
	
	if(this.options.host && typeof options.host === "undefined") {
		options.host = this.options.host;
	}
	
	if(this.options.hostname && typeof options.hostname === "undefined") {
		options.hostname = this.options.hostname;
	}
	
	if(this.options.port && typeof options.port === "undefined") {
		options.port = this.options.port;
	}
	
	return http.request(options);
};
	
Backend.prototype.forward = function(originRequest, originResponse) {
	var requestProxy = new RequestProxy(originRequest, originResponse, this);
	return requestProxy.proxy();
};

exports.Backend = Backend;