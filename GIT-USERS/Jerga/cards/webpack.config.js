var path = require("path"),
  _ = require("lodash"),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const vendor = [
  "lodash",
  "react",
  "react-dom",
  "react-router",
  "socket.io-client",
  "rxjs",
];

function createConfig(isDebug) {
  const devtool = isDebug ? "eval-source-map" : null;
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"), //extracting all plugins from main module to seperate one
    new webpack.DefinePlugin({
      // allows to define JS variables in resulting bundle that will be global variables that we can access
      "process.env": {
        NODE_ENV: `"${process.env.NODE_ENV || "development"}"`, // For minifier to realize to remove debug code when we are in production
      },
      IS_PRODUCTION: !isDebug,
      IS_DEVELOPMENT: isDebug,
    }),
  ];

  const loaders = {
    js: { test: /\.jsx?$/, loader: "babel", exclude: /node_modules/ },
    eslint: { test: /\.jsx?$/, loader: "eslint", exclude: /node_modules/ },
    json: { test: /\.json$/, loader: "json" },
    css: { test: /\.css$/, loader: "style!css?sourceMap" },
    sass: { test: /\.scss$/, loader: "style!css?sourceMap!sass?sourceMap" },
    files: {
      test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
      loader: "url-loader?limit=5000",
    },
  };

  const clientEntry = ["babel-polyfill", "./src/client/client.js"];
  let publicPath = "/build/";

  if (isDebug) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    clientEntry.unshift(
      "react-hot-loader/patch",
      "webpack-dev-server/client/?http://localhost:8080/",
      "webpack/hot/only-dev-server"
    );
    publicPath = "http://localhost:8080/build/";
  } else {
    plugins.push(
      new webpack.optimize.DedupePlugin(),
      new ExtractTextPlugin("[name].css"),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    );

    loaders.css.loader = ExtractTextPlugin.extract("style", "css");
    loaders.sass.loader = ExtractTextPlugin.extract("style", "css!sass");
  }

  return {
    name: "client",
    devtool,
    entry: {
      app: clientEntry,
      vendor,
    },
    output: {
      path: path.join(__dirname, "public", "build"),
      filename: "[name].js",
      publicPath,
    },
    resolve: {
      extensions: ["", ".js", ".jsx"],
      alias: {
        shared: path.join(__dirname, "src", "server", "shared"),
      },
    },
    module: {
      loaders: _.values(loaders),
    },
    plugins,
  };
}

module.exports = createConfig(process.env.NODE_ENV !== "production");
module.exports.create = createConfig;
