import { Tenant, User } from "db/queries";

export const typeDefs = /* GraphQL */ `
  type Query {
    user: User!
    space(shortId: String!): Tenant!
  }
  type Mutation {
    addTenant(name: String): Tenant!
  }
  type Tenant {
    id: ID!
    shortId: String!
    name: String!
    owner: User!
    users: [User!]!
    joinedAt: String!
    createdAt: String!
    updatedAt: String
  }
  type User {
    id: ID!
    name: String!
    email: String!
    picture: String
    spaces: [Tenant]!
    createdAt: String!
    updatedAt: String
  }
`;

export const resolvers = {
  Query: {
    user: (_, __, { user }) => user,
    space: (_, { shortId }, { user }) => User.getTenant(user, shortId)
  },
  User: {
    spaces: (_, __, { user }) => User.getTenants(user)
  },
  Tenant: {
    owner: tenant => Tenant.getOwner(tenant),
    users: tenant => Tenant.getUsers(tenant)
  },
  Mutation: {
    addTenant: (_, args, { user }) => User.createTenant(user, args)
  }
};
