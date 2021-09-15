/**
 * Check debug mode.
 */

var debug = !! process.env.DEBUG;

/**
 * Expose methods.
 */

exports.log = log;

/**
 * Log in debug mode.
 */

function log() {
  if (debug) console.log.apply(console, arguments);
}