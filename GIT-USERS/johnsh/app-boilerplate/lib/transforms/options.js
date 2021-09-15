'use strict';

/**
 * Initialize default options.
 */

module.exports = function(app) {
  app.disable('default routes');
  app.option('layoutDelims', ['{%', '%}']);
  app.option('escapeDelims', ['<%%', '<%']);
};
