/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGithub = /* GraphQL */ `
  query GetGithub($id: ID!) {
    getGithub(id: $id) {
      id
      datetime
      repos {
        id
        name
        url
        stars
        forks
      }
      createdAt
      updatedAt
    }
  }
`
export const listGithubs = /* GraphQL */ `
  query ListGithubs($filter: ModelGithubFilterInput, $limit: Int, $nextToken: String) {
    listGithubs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        datetime
        repos {
          id
          name
          url
          stars
          forks
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getTwitter = /* GraphQL */ `
  query GetTwitter($id: ID!) {
    getTwitter(id: $id) {
      id
      datetime
      followers
      tweets
      createdAt
      updatedAt
    }
  }
`
export const listTwitters = /* GraphQL */ `
  query ListTwitters($filter: ModelTwitterFilterInput, $limit: Int, $nextToken: String) {
    listTwitters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        datetime
        followers
        tweets
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
