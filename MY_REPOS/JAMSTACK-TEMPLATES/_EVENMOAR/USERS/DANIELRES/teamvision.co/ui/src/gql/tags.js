import { gql } from "apollo-boost"; // or you can use `import gql from 'graphql-tag';` instead

export const CREATE_TAG = gql`
  mutation createTag($name: String!, $description: String!) {
    createTag(name: $name, description: $description) {
      name
      description
    }
  }
`;

export const SET_TAG_ON = gql`
  mutation setTagOn(
    $tagName: String!
    $on: String!
    $targetType: String!
    $targetId: ID!
  ) {
    setTagOn(
      tagName: $tagName
      on: $on
      targetType: $targetType
      targetId: $targetId
    ) {
      id
    }
  }
`;

export const SET_TAG_PARENT = gql`
  mutation setTagParent($tagName: String!, $parentName: String) {
    setTagParent(tagName: $tagName, parentName: $parentName) {
      tagName
      parentName
    }
  }
`;

export const GET_TAGS = gql`
  {
    tags {
      id: name
      name
      description
    }
  }
`;

export const GET_TAG_TREE_DATA = gql`
  {
    tagTreeData {
      tags {
        all
        orphans
        roots
        metrics {
          motivations {
            tag
            level
            count
          }
          skills {
            tag
            level
            count
          }
        }
      }
      taggings {
        id
        src
        tgt
      }
    }
  }
`;

export const GET_TAG_WITH_TAGGINGS = gql`
  query($name: String!) {
    tag(name: $name) {
      description
      name
      taggings {
        id
        description
        on
        level
        person: target {
          ... on Person {
            id
            name
          }
        }
      }
    }
  }
`;

export const UPDATE_TAGGING = gql`
  mutation updateTagging($id: ID!, $level: Int, $description: String) {
    updateTagging(id: $id, level: $level, description: $description) {
      id
      level
    }
  }
`;
