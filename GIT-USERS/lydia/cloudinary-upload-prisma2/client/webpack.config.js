const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv");

module.exports = () => {
  const { parsed } = dotenv.config();

  const envKeys = Object.keys(parsed).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(parsed[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    output: {
      path: __dirname + "/dist",
      publicPath: "/",
      filename: "bundle.js"
    },
    node: {
      process: false
    },
    plugins: [
      new webpack.EnvironmentPlugin(envKeys),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: "./dist",
      hot: true
    }
  };
};
