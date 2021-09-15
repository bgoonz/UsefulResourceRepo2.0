exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const siteTemplate = require.resolve(`./src/templates/site.js`)

  const result = await graphql(`
    {
      allLandingPagesJson {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(result.errors)
    return
  }

  const sites = result.data.allLandingPagesJson.nodes

  sites.forEach(site => {
    createPage({
      path: `/${site.slug}`,
      component: siteTemplate,
      context: {
        slug: site.slug,
      },
    })
  })
}
