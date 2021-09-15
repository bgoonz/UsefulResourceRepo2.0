"use strict";

(function (factory) {
	if (typeof Benchmark !== "undefined") {
		factory(Benchmark);
	} else {
		factory(require("benchmark"));
	}
})(function (Benchmark) {
	var suite = new Benchmark.Suite;

	Benchmark.prototype.setup = function () {
		var concatContainer = [];
		var pushContainer = [];
		var dataToFeed = [];
		
		var initialArrayLength = 1e3;
		
		for (var j = 0; j < initialArrayLength; j++){
		    concatContainer.push('stuff' + j);
		    pushContainer.push('stuff' + j);
		    dataToFeed.push('stuff' + j);
		}
	};


	suite.add("concatContainer = concatContainer.concat(dataToFeed);", function () {
		concatContainer = concatContainer.concat(dataToFeed);
	});

	suite.add("pushContainer.push(...dataToFeed);", function () {
		pushContainer.push(...dataToFeed);
	});

	suite.on("cycle", function (evt) {
		console.log(" - " + evt.target);
	});

	suite.on("complete", function (evt) {
		console.log(new Array(30).join("-"));

		var results = evt.currentTarget.sort(function (a, b) {
			return b.hz - a.hz;
		});

		results.forEach(function (item) {
			console.log((idx + 1) + ". " + item);
		});
	});

	console.log("array augmenting: push read vs concat");
	console.log(new Array(30).join("-"));
	suite.run();
});
