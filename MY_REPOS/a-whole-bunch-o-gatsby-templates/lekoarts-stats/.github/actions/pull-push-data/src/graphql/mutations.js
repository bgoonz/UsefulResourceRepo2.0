/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGithub = /* GraphQL */ `
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
export const updateGithub = /* GraphQL */ `
  mutation UpdateGithub($input: UpdateGithubInput!, $condition: ModelGithubConditionInput) {
    updateGithub(input: $input, condition: $condition) {
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
export const deleteGithub = /* GraphQL */ `
  mutation DeleteGithub($input: DeleteGithubInput!, $condition: ModelGithubConditionInput) {
    deleteGithub(input: $input, condition: $condition) {
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
export const createTwitter = /* GraphQL */ `
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
export const updateTwitter = /* GraphQL */ `
  mutation UpdateTwitter($input: UpdateTwitterInput!, $condition: ModelTwitterConditionInput) {
    updateTwitter(input: $input, condition: $condition) {
      id
      datetime
      followers
      tweets
      createdAt
      updatedAt
    }
  }
`
export const deleteTwitter = /* GraphQL */ `
  mutation DeleteTwitter($input: DeleteTwitterInput!, $condition: ModelTwitterConditionInput) {
    deleteTwitter(input: $input, condition: $condition) {
      id
      datetime
      followers
      tweets
      createdAt
      updatedAt
    }
  }
`
