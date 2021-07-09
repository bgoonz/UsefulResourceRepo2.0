const { DllPlugin } = require("webpack");
const path = require("path");

// The "target" directory is hidden on glitch.com.
const outputPath = path.join(__dirname, "target");

module.exports = {
  mode: "development",
  entry: {
    components: ["./components.js"],
  },

  output: {
    filename: "[name].dll.js",
    path: outputPath,
    library: "[name]",
  },

  plugins: [
    new DllPlugin({
      context: __dirname,
      name: "[name]",
      path: path.join(outputPath, "[name].dll.manifest.json"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
          plugins: ["transform-object-assign"],
        },
      },
    ],
  },
};
