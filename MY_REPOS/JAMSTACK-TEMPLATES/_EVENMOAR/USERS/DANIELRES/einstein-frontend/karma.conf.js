"use strict";

var webpackConfig = {
  devtool: "inline-source-map",
  module: {
    loaders: require("./webpack.config.js").module.loaders,
  },
  resolve: require("./webpack.config.js").resolve,
  watch: true,
};

module.exports = function (config) {
  config.set({
    browsers: ["Chrome"],
    frameworks: ["mocha"],
    files: [{ pattern: "tests.webpack.js", watched: false }],
    preprocessors: {
      "tests.webpack.js": ["webpack"],
    },
    reporters: ["spec"],
    singleRun: false,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
    plugins: [
      "karma-mocha",
      "karma-webpack",
      "karma-chrome-launcher",
      "karma-phantomjs-launcher",
      "karma-spec-reporter",
    ],
  });
};
