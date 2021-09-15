exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const template = require.resolve('./src/templates/template.js')

  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  const posts = result.data.allMdx.nodes

  posts.forEach(post => {
    createPage({
      path: post.frontmatter.slug,
      component: template,
      context: {
        slug: post.frontmatter.slug,
      }
    })
  })
}