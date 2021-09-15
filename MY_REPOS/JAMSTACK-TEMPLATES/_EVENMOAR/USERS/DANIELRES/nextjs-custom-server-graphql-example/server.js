const {
  ApolloServer,
  makeExecutableSchema,
  gql,
} = require("apollo-server-express");
const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`;

const resolvers = {
  Query: {
    users() {
      return [{ name: "Nextjs" }];
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.prepare().then(() => {
  const path = "/api";

  const server = express();

  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app: server, path });

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
