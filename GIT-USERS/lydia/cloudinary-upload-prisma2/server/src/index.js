const { GraphQLServer } = require("graphql-yoga");
const { makeSchema } = require("nexus");
const { Photon } = require("@generated/photon");
const { nexusPrismaPlugin } = require("nexus-prisma");

const types = require("./types");

const photon = new Photon();

new GraphQLServer({
  schema: makeSchema({
    types,
    plugins: [nexusPrismaPlugin()]
  }),
  context: { photon }
}).start(() => console.log(`🚀 Server ready at: http://localhost:4000`));
