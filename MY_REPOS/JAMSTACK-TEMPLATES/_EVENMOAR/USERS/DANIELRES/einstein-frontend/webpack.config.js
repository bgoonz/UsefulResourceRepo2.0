"use strict";

var webpack = require("webpack");

var defineProjectSettings = new webpack.DefinePlugin({
  __SETTINGS__: JSON.stringify(require("./project_settings")),
});

module.exports = {
  entry: [
    "./app/main.jsx",
    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
    "./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
    "./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
    "./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2",
    "./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ["node_modules", "app"],
  },
  output: {
    path: "./build",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|api|bin)/,
        loader: "babel-loader?cacheDirectory",
      },
      {
        test: /\.css$/,
        // exclude: /(app|api|bin|build)/,
        loader: "file-loader?name=css/[name].[ext]",
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        // exclude: /(app|api|bin|build)/,
        loader: "file-loader?name=fonts/[name].[ext]",
      },
    ],
  },

  plugins: [defineProjectSettings],
};
