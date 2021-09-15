var Client = require('./client').Client,
    debug = require('./util').debug;

// Create a client
var createClient = function (options) {
  return new Client(options);
};

exports.createClient = createClient;
exports.debug = debug;