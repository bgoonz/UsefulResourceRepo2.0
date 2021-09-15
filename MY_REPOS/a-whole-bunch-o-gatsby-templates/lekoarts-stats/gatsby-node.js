const { createClient } = require('@urql/core')
const { VanillaExtractPlugin } = require(`@vanilla-extract/webpack-plugin`)
require('isomorphic-unfetch')

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: require.resolve(`@vanilla-extract/babel-plugin`),
  })
}

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === `develop` || stage === `build-javascript`) {
    actions.setWebpackConfig({
      plugins: [new VanillaExtractPlugin()],
    })
  }
}

const client = createClient({
  url: process.env.AWS_GRAPHQL_API_URL,
  requestPolicy: 'network-only',
  fetchOptions: () => ({
    headers: {
      'Content-Type': 'application/graphql',
      'x-api-key': process.env.AWS_GRAPHQL_API_TOKEN,
    },
  }),
})

const QUERY = `
query {
  listTwitters {
    items {
      id
      datetime
      followers
      tweets
    }
  }
  listGithubs {
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
    }
  }
}
`

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Github implements Node {
      id: ID!
      datetime: Date! @dateformat
      repos: [Repo!]!
    }
    
    type Repo {
      id: ID!
      name: String!
      url: String!
      stars: Int!
      forks: Int!
    }
    
    type Twitter implements Node {
      id: ID!
      datetime: Date! @dateformat
      followers: Int!
      tweets: Int!
    }
  `)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions

  let data

  try {
    const _rawData = await client.query(QUERY).toPromise()
    reporter.info('Successfully sourced AWS data')
    data = {
      twitter: _rawData.data.listTwitters.items,
      github: _rawData.data.listGithubs.items,
    }
  } catch (error) {
    reporter.panicOnBuild(error)
  }

  data.twitter.forEach((t) => {
    const node = {
      ...t,
      id: createNodeId(`twitter-${t.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Twitter',
        content: JSON.stringify(t),
        contentDigest: createContentDigest(t),
      },
    }

    createNode(node)
  })

  data.github.forEach((g) => {
    const node = {
      ...g,
      id: createNodeId(`github-${g.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Github',
        content: JSON.stringify(g),
        contentDigest: createContentDigest(g),
      },
    }

    createNode(node)
  })
}
