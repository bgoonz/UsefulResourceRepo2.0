// To setup App:
// https://developers.facebook.com/apps/async/create/platform-setup/dialog/

// App setup example:
// https://developers.facebook.com/docs/games/instant-games/getting-started/quickstart#app-setup

// To test App:
// https://www.facebook.com/embed/instantgames/YOUR_GAME_ID/player?game_url=https://localhost:8080

// Dev Server for FB
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

// Dev Server for FB

// Meta tags for display
{
  /* <meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, user-scalable=no, minimal-ui">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="full-screen" content="yes" />
<meta name="screen-orientation" content="portrait" />
<script src="https://connect.facebook.net/en_US/fbinstant.6.3.js"></script> */
}
// Meta tags for display
