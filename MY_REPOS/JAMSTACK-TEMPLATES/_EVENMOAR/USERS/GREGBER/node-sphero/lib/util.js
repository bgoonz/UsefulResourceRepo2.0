// Debug value, default `false`
var DEBUG = false;

// Enable or disable debug mode
var debug = function (bool) {
  DEBUG = bool === false ? false : true;
};

// Log
var log = function () {
  if (DEBUG)
    console.log.apply(console, arguments);
};

exports.debug = debug;
exports.log = log;