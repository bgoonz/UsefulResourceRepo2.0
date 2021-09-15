var http = require('http'),
rollingpin = require('./index'),
Q = require("q");


// Backend 1
http.createServer(function (req, res) {
	res.writeHead(200, {
		"Content-Type": "text/plain",
		"Cache-Control": "s-max-age=5"
	});
	setTimeout(function() { 
		res.write('BACKEND 1 request successfully proxied: ' + req.url +'\n' + JSON.stringify(req.headers, true, 2));
		res.end();
	}, 6000);
}).listen(9001);

// Backend 2
http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('BACKEND 2 : request successfully proxied: ' + req.url +'\n' + JSON.stringify(req.headers, true, 2));
	res.end();
}).listen(9002);


// Define backend and proxy
var backend1 = new rollingpin.Backend({port: 9001, timeout: 1}),
	backend2 = new rollingpin.Backend({port: 9002}),
	backend3 = new rollingpin.Backend({port: 9003}); // error
	
var cacheDb = new rollingpin.RedisDatabase(),
	cacheManager = new rollingpin.CacheManager(cacheDb);

var ruleSuite = new rollingpin.RuleSuite();

/*
Request URL match /toto/
    -> 403
    -> Désolé
*/
ruleSuite.when(function(config, defer) {
	return /toto/.test(config.req.url);
},
function(config) {
	config.res.statusCode = 403;
	config.res.write('Desole');
	config.res.end();
});

/*
Request URL match /b1/
    -> Backend 1
*/
ruleSuite.when(function(config) {
	return /b1/.test(config.req.url);
}, function(config) {
	var defer = Q.defer();
	
	cacheManager.get(config.req).then(function(result) {
		console.log("from cache");
		result.writeResponse(config.res);
	},
	function() {
		console.log("from backend");
		backend1.forward(config.req, config.res).then(function(result) {
			cacheManager.cache(config.req, result);
			defer.resolve();
		});
	});
	
	return defer.promise;
});

/*
Request URL match /b3/
    -> Backend 3
*/
ruleSuite.when(function(config) {
	return /b3/.test(config.req.url);
}, function(config) {
	backend3.on("error", function() {
		config.res.statusCode = 500;
		config.res.write("Custom error message");
		config.res.end();
	});
	return backend3.forward(config.req, config.res);
});

/*
Request URL match /b2/
    -> Backend 2
*/
ruleSuite.when(function(config) {
	return /b2/.test(config.req.url);
}, function(config) {
	return backend2.forward(config.req, config.res);
});

// Proxy
http.createServer(function (req, res) {
	
	var config = {
		req : req,
		res : res
	};
	
	ruleSuite.run(config).then(function(config) {
		config.res.writeHead(502, {
			"Content-Type": "text/plain"
		});
		config.res.write("Bad Gateway");
		config.res.end();
	});
	
}).listen(8000);

var options = {
  host: 'localhost',
  port: 8000,
  path: '/b1/',
  method: 'GET'
};

http.request(options, function(res) {
	console.log(res.statusCode);
	console.log(res.headers);
}).end();
