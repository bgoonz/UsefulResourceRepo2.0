'use strict';

/**
 * Expose node.js `console` methods to templates on
 * the `console` helper collection
 */

module.exports = function(app) {
  app.helpers({console: console});
};
