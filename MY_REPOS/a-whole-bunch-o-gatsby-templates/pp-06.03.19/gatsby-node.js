/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = require.resolve(`./src/templates/blogpost.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  return graphql(`
    {
      allMdx {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.allMdx.edges.forEach(edge => {
      createPage({
        // Path for this page — required
        path: `${edge.node.frontmatter.slug}`,
        component: blogPostTemplate,
        context: {
          slug: edge.node.frontmatter.slug,
        },
      })
    })
  })
}
