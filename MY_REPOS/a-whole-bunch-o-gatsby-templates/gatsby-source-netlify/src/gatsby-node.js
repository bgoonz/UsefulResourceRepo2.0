const NetlifyAPI = require('netlify')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, reporter }, { apiKey, opts = {} }) => {
  const { createNode } = actions

  if (!apiKey) {
    reporter.panicOnBuild('Please define a Netlify access token')
  }

  const client = new NetlifyAPI(apiKey, opts)

  const nodeHelper = (input, name) => {
    input.netlify_id = input.id
    input.id = createNodeId(`gatsby-source-netlify-${input.netlify_id}`)

    const node = {
      ...input,
      parent: null,
      children: [],
      internal: {
        type: `Netlify${name}`,
      },
    }

    node.internal.content = JSON.stringify(node)
    node.internal.contentDigest = createContentDigest(node)

    createNode(node)
  }

  try {
    const sites = await client.listSites()
    const user = await client.getCurrentUser()

    sites.forEach(site => nodeHelper(site, 'Sites'))
    nodeHelper(user, 'User')
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
