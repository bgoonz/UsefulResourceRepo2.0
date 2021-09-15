const postTemplate = require.resolve(`./src/templates/post.jsx`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allSanityPost {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error in loading Sanity posts`, result.errors)
    return
  }

  const posts = result.data.allSanityPost.nodes

  posts.forEach((post) => {
    createPage({
      path: `/${post.slug.current}`,
      component: postTemplate,
      context: {
        slug: post.slug.current,
      },
    })
  })
}
