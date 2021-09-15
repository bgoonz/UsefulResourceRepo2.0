'use strict';

/**
 * Load built-in engines
 */

module.exports = function(app) {
  app.engine('md', require('engine-lodash'));
  app.engine('*', function noop(str, opts, cb) {
    if (typeof opts === 'function') cb = opts;
    cb(null, str);
  });
};
