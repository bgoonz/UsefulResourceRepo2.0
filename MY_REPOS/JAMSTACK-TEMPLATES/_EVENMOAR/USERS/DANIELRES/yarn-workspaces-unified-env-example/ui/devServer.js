import express from "express";
import proxy from "http-proxy-middleware";
import Bundler from "parcel-bundler";

const config = {
  devServerPort: process.env.UI_DEV_SERVER_PORT,
  endpoint: process.env.API_GRAPHQL_ENDPOINT,
  port: process.env.API_PORT
};

const bundler = new Bundler("src/index.html", {
  cache: true,
  cacheDir: `.cache/${process.env.NODE_ENV}`,
  autoInstall: false
});

const app = express();

app.use(
  config.endpoint,
  proxy({
    target: `http://localhost:${config.port}`,
    ws: true
  })
);

app.use(bundler.middleware());

app.listen(config.devServerPort, () => {
  console.log(`[UI] devServer: http://localhost:${config.devServerPort}`);
});
