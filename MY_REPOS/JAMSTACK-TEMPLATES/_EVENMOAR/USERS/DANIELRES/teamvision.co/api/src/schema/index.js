const { makeExecutableSchema } = require("graphql-tools");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const schema = makeExecutableSchema({ resolvers, typeDefs });

module.exports = schema;
