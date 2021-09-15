var kue = require("kue"),
jobs = kue.createQueue(),
redis = require("redis"),
redisClient = redis.createClient();

var WorkerRequest = function() {
};

WorkerRequest.prototype =  {
  generateRequestId: function(callback) {
    var self = this;
    return redisClient.incr('next:request:id', function(err, count) {
      self.id = count;
      callback();
    });
  },
  
  request : function(text, callback) {
    this.search = text;
    var self = this;
    this.generateRequestId(function() {
      jobs.create("new:request", {
        text: text,
        requestId: self.id
      }).save(function() {
        callback();
      });
    });
  }
};

exports.WorkerRequest = WorkerRequest;