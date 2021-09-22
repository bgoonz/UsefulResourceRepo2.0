import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from "graphql";

let Schema = (db) => {
  let data = [
    {
      counter: 42,
    },
    {
      counter: 43,
    },
    {
      counter: 44,
    },
  ];

  let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      url: { type: GraphQLString },
    }),
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: () => ({
        links: {
          type: new GraphQLList(linkType),
          resolve: () => db.collection("links").find({}).toArray(), //read from mongo
        },
      }),
    }),
  });

  return schema;
};

export default Schema;
