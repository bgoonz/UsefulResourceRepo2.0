const webpack = require("webpack");
const path = require("path");
const envFile = require("node-env-file");

/* eslint-disable */

process.env.NODE_ENV = process.env.NODE_ENV || "development";

try {
  envFile(path.join(__dirname, "config/" + process.env.NODE_ENV + ".env"));
} catch (e) {}

module.exports = {
  debug: true,
  noInfo: false,
  entry: [
    "eventsource-polyfill", // necessary for hot reloading with IE
    "webpack-hot-middleware/client?reload=true", //note that it reloads the page if hot module reloading fails.
    "script!jquery/dist/jquery.min.js",
    "bootstrap-sass!./bootstrap-sass.config.js",
    "./app/app.js",
  ],
  externals: {
    jquery: "jQuery",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    // new webpack.DefinePlugin({
    //     'process.env' : {
    //         NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    //         API_KEY: JSON.stringify(process.env.API_KEY),
    //         AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
    //         DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
    //         STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
    //         GITHUB_ACCESS_TOKEN: JSON.stringify(process.env.GITHUB_ACCESS_TOKEN)
    //     }
    // })
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  resolve: {
    root: __dirname,
    modulesDirectories: ["node_modules"],
    alias: {},
    extensions: ["", ".js", ".jsx", ".node"],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "app"),
        loaders: ["babel"],
      },
      { test: /bootstrap\/js\//, loader: "imports?jQuery=jquery" },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream",
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml",
      },
    ],
  },

  devtool:
    process.env.NODE_ENV === "production"
      ? undefined
      : "cheap-module-eval-source-map",
};
