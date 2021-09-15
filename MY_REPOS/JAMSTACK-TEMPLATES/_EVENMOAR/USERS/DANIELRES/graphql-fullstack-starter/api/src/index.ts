import { ApolloServer } from "apollo-server-express";
import cookieSession from "cookie-session";
import express from "express";
import config from "../config";
import context from "./context";
import formatError from "./formatError";
import resolvers from "./schema/resolvers";
import typeDefs from "./schema/typeDefs";

const { PORT, SECURE } = config;
const { KEY1, KEY2, MAX_AGE_MINUTES } = config.auth.cookie;
const { ORIGIN } = config.cors;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  formatError,
});

const server = express();

server.use(
  cookieSession({
    name: "session",
    keys: [KEY1, KEY2],
    maxAge: MAX_AGE_MINUTES * 1000 * 60,
    secure: SECURE,
  })
);

server.use((req, res, next) => {
  if (!req.session) {
    console.error("req.session not available");
    throw new Error("Server error");
  }
  req.session.views = req.session.views + 1;
  next();
});

apollo.applyMiddleware({
  app: server,
  cors: { origin: ORIGIN, credentials: true },
});

server.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}${apollo.graphqlPath}`);
});
