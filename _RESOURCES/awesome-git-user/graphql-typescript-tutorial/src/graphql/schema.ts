const { gql } = require("apollo-server");

export const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    password: String
    projects: [Project]
  }

  type Project {
    id: Int
    title: String
    status: String
    members: [User]
  }

  type Query {
    users: [User]
  }
`;
