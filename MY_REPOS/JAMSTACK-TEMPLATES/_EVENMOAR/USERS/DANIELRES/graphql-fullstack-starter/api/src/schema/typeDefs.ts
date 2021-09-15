import { gql } from "apollo-server-express";

export default gql`
  type Query {
    hello: String!
    me: User!
  }

  type Mutation {
    signin(input: InputSignin!): User!
    signup(input: InputSignup!): User!
    signout: Boolean!
  }

  ### Scalars

  scalar DateTime

  ### Inputs

  input InputSignin {
    email: String!
    password: String!
  }

  input InputSignup {
    email: String!
    name: String!
    password: String!
  }

  ### Types

  type User {
    id: String!
    name: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime
  }
`;
