import { gql } from "apollo-boost"; // or you can use `import gql from 'graphql-tag';` instead

// Person fields must be the same in CREATE_PERSON and GET_PERSONS
// for the Apollo cache to be updated
const personFields = `id email name picture createdAt headline currentPosition`;

export const CREATE_PERSON = gql`
  mutation createPerson(
    $email: String!,
    $name: String!,
    $picture: String,
    $headline: String,
    $currentPosition: String
  ) {
    createPerson(
      email: $email,
      name: $name,
      picture: $picture,
      headline: $headline
      currentPosition: $currentPosition
      ) {
      ${personFields}
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation updatePerson(
    $id: ID!,
    $email: String,
    $name: String,
    $picture: String,
    $headline: String,
    $currentPosition: String
  ) {
    updatePerson(
      id: $id,
      email: $email,
      name: $name,
      picture: $picture,
      headline: $headline
      currentPosition: $currentPosition
      ) {
      ${personFields}
    }
  }
`;

export const GET_PERSONS = gql`
  {
    persons {
      ${personFields}
    }
  }
`;

export const GET_PERSON_WITH_TAGGINGS = gql`
  query($id: ID) {
    person(id: $id) {
      id
      email
      headline
      currentPosition
      name
      picture
      createdAt
      taggings {
        id
        on
        level
        description
        tag {
          name
        }
      }
    }
  }
`;
