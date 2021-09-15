const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withTM = require("next-plugin-transpile-modules");

module.exports = withCSS(
  withSass({
    webpack(config) {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
            name: "[name].[ext]",
          },
        },
      });
      return config;
    },
  })
);
