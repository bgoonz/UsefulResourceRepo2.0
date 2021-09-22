const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    quakes( # replace the current launches query with this one.
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): QuakeConnection!
    quake(id: ID!): Quake
    users: [User]
    # Queries for the current user
    me: User
  }

  """
  Simple wrapper around our list of quakes that contains a cursor to the
  last item in the list. Pass this cursor to the quakes query to fetch results
  after these.
  """
  type QuakeConnection { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    quakes: [Quake]!
  }

  type Quake {
    id: ID!
    location: String
    magnitude: Float
    when: String
    cursor: String
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    records: [Quake]
  }
  type Mutation {
    # if false, saving record failed -- check errors
    saveRecord(recordId: ID!): RecordUpdateResponse!
    # if false, deleting record failed -- check errors
    deleteRecord(recordId: ID!): RecordUpdateResponse!
    login(email: String, password: String): String # login token
  }
  type RecordUpdateResponse {
    success: Boolean!
    message: String
    records: [Quake]
  }
`;

module.exports = typeDefs;
