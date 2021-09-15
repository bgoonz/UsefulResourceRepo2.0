var Q = require("q");

var Rule = function(condition, success, fail) {
	this.condition = condition;
	this.success = success;
	this.fail = fail;
};


var RuleSuite = function() {
	this.rules = [];
};

RuleSuite.prototype = {
	when : function(condition, success, fail) {
		var rule = new Rule(condition, success, fail);
		this.rules.push(rule);
		
		return this;
	},
	
	run : function(config) {
		var ruleJobChain = new RuleJobChain(this.rules, config);
		return ruleJobChain.run();
	}
};


var RuleJob = function(rule, config) {
	this.rule = rule;
	this.config = config;
	this.defer = Q.defer();
	this.callbackDefer = Q.defer();
};

RuleJob.prototype = {
	callbackWrapper : function(callback) {
		var result = false;
		
		if(typeof callback === "function") {
			result = callback(this.config);
		}
		
		if(Q.isPromise(result)) {
			result.then(this.callbackDefer.resolve, this.callbackDefer.resolve);
		}
		else {
			this.callbackDefer.resolve();
		}
	},
	
	run : function() {
		var self = this;
		
		this.defer.promise.then(
			function() {
				self.callbackWrapper(self.rule.success);
			},
			function() {
				self.callbackWrapper(self.rule.fail);
			}
		);
		
		if(typeof this.rule.condition === "function") {
			var result = this.rule.condition.apply(this.rule, [this.config, this.defer]);
			
			if(false === Q.isPromise(result) && typeof result !== "undefined") {
				result ? this.defer.resolve(this.config) : this.defer.reject(this.config);
			}
		}
		else {
			this.rule.condition ? this.defer.resolve(this.config) : this.defer.reject(this.config);
		}
		
		return this.defer.promise;
	}
};


var RuleJobChain = function(rules, config) {
	this.rules = rules;
	this.config = config;
	this.i = 0;
	this.defer = Q.defer();
};

RuleJobChain.prototype = {
	run : function() {
		this.loop();
		return this.defer.promise;
	},
	
	loop : function() {
		if(this.i < this.rules.length) {
			
			if(this.config.res.finished === true) {
				return this.end();
			}
			
			var rule = this.rules[this.i],
				ruleJob = new RuleJob(rule, this.config);
			
			ruleJob.callbackDefer.promise.then(this.loop.bind(this), this.loop.bind(this));
			ruleJob.run();
			this.i++;
		}
		else if(this.i === this.rules.length) {
			return this.end();
		}
	},
	
	end : function() {
		this.i = this.rules.length; // prevent loop to be executed
		this.defer.resolve(this.config);
	}
};


exports.RuleSuite = RuleSuite;
exports.Rule = Rule;