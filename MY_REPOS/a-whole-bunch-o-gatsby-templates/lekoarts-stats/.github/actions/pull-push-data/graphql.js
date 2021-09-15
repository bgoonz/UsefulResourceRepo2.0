const gql = require('graphql-tag')

const GITHUB_QUERY = `
query {
  search(query: "user:LekoArts topic:lekoarts-gatsby-themes", type: REPOSITORY, first: 50) {
    nodes {
      ... on Repository {
        stargazers {
          totalCount
        }
        forkCount
        name
        url
        id
      }
    }
  }
}
`

const createGithub = gql`
  mutation CreateGithub($input: CreateGithubInput!, $condition: ModelGithubConditionInput) {
    createGithub(input: $input, condition: $condition) {
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

const createTwitter = gql`
  mutation CreateTwitter($input: CreateTwitterInput!, $condition: ModelTwitterConditionInput) {
    createTwitter(input: $input, condition: $condition) {
      id
      datetime
      followers
      tweets
      createdAt
      updatedAt
    }
  }
`

module.exports = { GITHUB_QUERY, createGithub, createTwitter }
