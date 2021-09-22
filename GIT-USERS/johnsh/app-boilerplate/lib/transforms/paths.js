'use strict';

/**
 * Prime `app.cache.paths`
 */

module.exports = function(app) {
  app.cache.paths = app.cache.paths || [];
};
