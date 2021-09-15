exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type YamlPost implements Node & Post {
      slug: String!
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int!
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
    }

    type YamlPage implements Node & Page {
      slug: String!
      title: String!
      excerpt(pruneLength: Int = 140): String!
      body: String!
    }
  `)
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions

  if (node.internal.type !== `PostsYaml` && node.internal.type !== `PagesYaml`) {
    return
  }

  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `PostsYaml` && source === 'content/posts') {
    let modifiedTags

    if (node.tags) {
      modifiedTags = node.tags.map(tag => ({
        name: tag,
        slug: tag,
      }))
    } else {
      modifiedTags = null
    }

    const fieldData = {
      slug: node.slug,
      title: node.title,
      body: node.body,
      timeToRead: node.timeToRead,
      excerpt: node.excerpt,
      date: node.date,
      tags: modifiedTags,
      banner: node.banner,
      description: node.description,
    }

    const yamlPostId = createNodeId(`${node.id} >>> YamlPost`)

    createNode({
      ...fieldData,
      // Required fields
      id: yamlPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `YamlPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Yaml implementation of the Post interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(yamlPostId) })
  }

  if (node.internal.type === `PagesYaml` && source === 'content/pages') {
    const fieldData = {
      slug: node.slug,
      title: node.title,
      body: node.body,
      excerpt: node.excerpt,
    }

    const yamlPageId = createNodeId(`${node.id} >>> YamlPage`)

    createNode({
      ...fieldData,
      // Required fields
      id: yamlPageId,
      parent: node.id,
      children: [],
      internal: {
        type: `YamlPage`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Yaml implementation of the Page interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(yamlPageId) })
  }
}