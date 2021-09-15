const typeDefs = /* GraphQL */ `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    tagTreeData: TagTreeData
    person(email: String, id: ID): Person
    persons(search: String): [Person]
    tag(name: String, id: ID): Tag
    tags(search: String): [Tag]
    userInfo: User
  }

  type User {
    email: String!
    email_verified: Boolean
    picture: String
    given_name: String
    family_name: String
    name: String
    locale: String
    updated_at: String
  }

  type Mutation {
    createPerson(
      email: String!
      name: String!
      picture: String
      headline: String
      currentPosition: String
    ): Person
    updatePerson(
      id: ID!
      email: String
      name: String
      picture: String
      headline: String
      currentPosition: String
    ): Person
    createTag(name: String!, description: String): Tag
    applyTagging(
      name: String!
      description: String
      targetLabel: String!
      targetKey: String!
      targetValue: String!
    ): TaggingRelationship!

    updateTagging(
      id: ID!
      description: String
      level: Int
    ): TaggingRelationship!

    setTagOn(
      tagName: String!
      on: String!
      targetType: String!
      targetId: ID!
    ): TaggingRelationship!
    setTagParent(tagName: String!, parentName: String): SetTagParentResponse
    createCurrentUserPerson: Person
    updateCurrentUserPersonName(name: String!): Person
  }

  type Person {
    id: ID!
    email: String!
    name: String
    headline: String
    currentPosition: String
    picture: String
    createdAt: String
    label: String!
    taggings: [TaggingRelationship]!
  }

  type SetTagParentResponse {
    tagName: String!
    parentName: String
  }

  type TagTreeData {
    tags: TagTreeDataTags
    taggings: [TagTreeDataTagging!]
  }

  type TagTreeDataTags {
    all: [String!]
    orphans: [String!]
    roots: [String!]
    metrics: Metrics
  }

  type Metrics {
    skills: [Metric]
    motivations: [Metric]
  }

  type Metric {
    tag: String!
    level: Int
    count: Int
  }

  type TagTreeDataTagging {
    id: ID!
    src: String!
    tgt: String!
  }

  type TaggingRelationship {
    id: ID!
    description: String
    on: String
    level: Int
    tag: Tag!
    target: TaggingRelationshipTarget!
  }

  union TaggingRelationshipTarget = Person | Tag

  type Tag {
    id: ID!
    name: String!
    description: String
    created: String
    label: String!
    taggings: [TaggingRelationship]!
  }
`;

module.exports = typeDefs;
