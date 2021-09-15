const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.js");
const webpackNodeExternals = require("webpack-node-externals");

const config = {
  // Inform webpack that we are building bundel for node.js rather than for browser
  target: "node",
  devtool: "source-map",
  //  Tell the webpack the root file of our server App
  entry: "./src/index.js",

  // Tell webpack where to put the output file that is generated
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  externals: [webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);
