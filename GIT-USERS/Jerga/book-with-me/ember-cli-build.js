"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      extension: "sass",
    },
    "ember-cli-babel": {
      includePolyfill: true,
    },
    "ember-bootstrap": {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
      importBootstrapFont: false,
    },
  });

  app.import("bower_components/bootstrap/dist/js/bootstrap.js", {
    destDir: "assets",
  });

  return app.toTree();
};
