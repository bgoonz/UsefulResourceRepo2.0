const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const authMiddleware = require("./authMiddleware");
const sslRedirect = require("./sslRedirectMiddleware");
const env = require("./env");
const schema = require("./schema");
const neo4jDriver = require("./neo4jDriver");
const morgan = require("morgan");

const app = express()
  .use(sslRedirect())
  .use(cookieParser())
  .use(authMiddleware)
  .use(express.static(path.join(__dirname, "../frontend")))
  .use(morgan("dev"))
  .use((req, res, next) => console.log("\n-----\n") || next());

app.get("/authenticate", (req, res) => {
  // Route provided for using authMiddleware alone
  res.end();
});

app.get("/logout", (req, res) => {
  res.cookie("teamvis_jwt", "", { expires: new Date(0) });
  res.cookie("teamvis_authenticated", "", { expires: new Date(0) });
  res.end();
});

const httpServer = http.createServer(app);

const graphQlServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    try {
      return { isAuthenticated: req.isAuthenticated, userInfo: req.userInfo };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
});

graphQlServer.applyMiddleware({ app });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../frontend/index.html"));
});

if (require.main === module) {
  httpServer.listen({ port: env.PORT }, () => {
    console.log(
      `🚀 GraphQl ready at http://localhost:${env.PORT}${graphQlServer.graphqlPath}`
    );
  });
} else {
  httpServer.on("close", () => neo4jDriver.close());
}

module.exports = httpServer;
