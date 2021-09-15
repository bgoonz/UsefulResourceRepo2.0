import express from "express";
import createExpressPino from "express-pino-logger";
import bodyParser from "body-parser";
import next from "next";

import { insertMockData, setupDbConnection } from "./db";
import { createApolloServer } from "./graphql/server";
import { logger } from "../logger";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY || "SHOULD_NOT_USE_THIS_IN_PRODUCTION";
const nextApp = next({ dev, dir: "./client" });
const nextHandler = nextApp.getRequestHandler();

export default async function main() {
  await nextApp.prepare();

  const server = express();
  const expressPino = createExpressPino({
    logger,
  });
  server.use(expressPino);
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  const apolloServer = createApolloServer(JWT_SECRET_KEY);
  apolloServer.applyMiddleware({ app: server });

  // all requests to paths other than `/graphql` are processed by Nextjs
  server.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  try {
    await setupDbConnection(dev);
    if (dev) {
      insertMockData();
    }
  } catch (err) {
    logger.error(err);
    return;
  }

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    logger.info(`> Ready on http://localhost:${port}`);
  });
}
