module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader", // 'babel-loader' is also a legal name to reference
        query: {
          presets: ["es2015", "stage-1", "react"],
        },
      },
    ],
  },
};
