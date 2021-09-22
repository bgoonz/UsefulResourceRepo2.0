const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    compress: true,
    https: true,
    port: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.FB_ENV": JSON.stringify(true),
    }),
  ],
});
