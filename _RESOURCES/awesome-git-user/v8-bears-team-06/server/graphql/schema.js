import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
} from "graphql";
import jwt from "jsonwebtoken";

import { User } from "../models/user";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const AuthDataType = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    token: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    login: {
      type: AuthDataType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid credential");
        }
        // TODO: use bycrpt instead
        if (user.password !== password) {
          throw new Error("Invalid credential");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
          expiresIn: "1h",
        });
        return { token };
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const check = await User.findOne({ email: args.email });
        if (check) {
          return { email: "taken", password: "anything" };
        } else if (args.email.length === 0) {
          return { email: "empty", password: "anything" };
        }
        let user = new User({
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
