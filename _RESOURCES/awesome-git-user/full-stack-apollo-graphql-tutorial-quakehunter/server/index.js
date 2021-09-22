const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");
const { createStore } = require("./utils");

const QuakeAPI = require("./datasources/quake");
const UserAPI = require("./datasources/user");

const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || "";
    let email = "";
    let token = "";

    const getToken = () => {
      return auth.split(" ")[1];
    };
    if (auth.length && auth.split(" ")[1]) {
      token = getToken();
    }
    if (token !== "") {
      email = jwt.verify(token, "secret_key").email;
    }

    // find a user by their email
    const usercheck = await store.users.map((user) => {
      if (email === user.email) {
        return user;
      }
    });

    let users = [];
    await usercheck.forEach((elem) => {
      if (elem) {
        users.push(elem);
      }
    });
    const user = users && users[0] ? users[0] : null;
    return { user };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    quakeAPI: new QuakeAPI(),
    userAPI: new UserAPI({ store }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
