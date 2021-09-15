'use strict';

/**
 * Metadata for the current `app.runner`
 */

module.exports = function(app) {
  app.data({
    runner: {
      name: 'app',
      url: 'https://github.com/jonschlinkert/app-boilerplate'
    }
  });
};
