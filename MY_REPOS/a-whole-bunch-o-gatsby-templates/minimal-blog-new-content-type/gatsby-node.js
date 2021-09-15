const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    interface Book @nodeInterface {
      id: ID!
      slug: String!
      type: String!
      title: String!
      rating: Int!
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      tags: [String]
      cover: File @fileByRelativePath
      description: String
    }
    
    type MdxBook implements Node & Book {
      slug: String!
      title: String!
      type: String!
      rating: Int!
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      tags: [String]
      cover: File @fileByRelativePath
      description: String
    }
  `)
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions

  // Make sure that it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "postsPath" and "pagesPath"
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  // Check for "posts" and create the "Post" type
  if (node.internal.type === `Mdx` && source === 'books') {
    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : createFilePath({ node, getNode, basePath: "books" }),
      title: node.frontmatter.title,
      type: node.frontmatter.type,
      rating: node.frontmatter.rating,
      tags: node.frontmatter.tags,
      cover: node.frontmatter.cover,
      description: node.frontmatter.description,
    }

    const mdxBookId = createNodeId(`${node.id} >>> MdxBook`)

    createNode({
      ...fieldData,
      // Required fields
      id: mdxBookId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxBook`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Book interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxBookId) })
  }
}

const bookTemplate = require.resolve(`./src/templates/book.jsx`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allBook {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your books`, result.errors)
    return
  }

  const books = result.data.allBook.nodes

  books.forEach((book) => {
    createPage({
      path: book.slug,
      component: bookTemplate,
      context: {
        slug: book.slug,
      },
    })
  })
}