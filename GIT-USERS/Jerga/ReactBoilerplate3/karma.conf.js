var webpackConfig = require("./webpack.config.js");

module.exports = function (config) {
  config.set({
    hostname: process.env.IP,
    port: 8081,
    runnerPort: 0,
    browsers: ["PhantomJs"],
    singleRun: true,
    frameworks: ["mocha"],
    files: [
      "app/tests/**/*.test.jsx",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/foundation-sites/dist/foundation.min.js",
    ],
    preprocessors: {
      "app/tests/**/*.test.jsx": ["webpack", "sourcemap"],
    },
    reporters: ["mocha"],
    client: {
      mocha: {
        timeout: "5000",
      },
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
