const path = require("path");
const exec = require("child_process").exec;
const Dotenv = require("dotenv-webpack");

let isCompiled = false;

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  // TODO: Explain Source Map
  devtool: "inline-source-map",
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", (_) => {
          if (isCompiled) {
            return;
          }
          const child = exec("npm run start");
          child.stdout.on("data", function (data) {
            isCompiled = true;
            process.stdout.write(data);
          });
          child.stderr.on("data", function (data) {
            process.stderr.write(data);
          });
        });
      },
    },
  ],
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build", "js"),
  },
};
