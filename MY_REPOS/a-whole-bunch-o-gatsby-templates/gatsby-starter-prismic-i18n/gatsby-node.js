const _ = require('lodash')
const locales = require('./config/i18n')
const { replaceTrailing, localizedSlug, replaceBoth, wrapper } = require('./src/utils/gatsby-node-helpers')

// Take the pages from src/pages and generate pages for all locales, e.g. /index and /en/index
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Only create one 404 page at /404.html
  if (page.path.includes('404')) {
    return
  }

  // First delete the pages so we can re-create them
  deletePage(page)

  Object.keys(locales).map(lang => {
    // Remove the trailing slash from the path, e.g. --> /categories
    page.path = replaceTrailing(page.path)

    // Remove the leading AND traling slash from path, e.g. --> categories
    const name = replaceBoth(page.path)

    // Create the "slugs" for the pages. Unless default language, add prefix àla "/en"
    const localizedPath = locales[lang].default ? page.path : `${locales[lang].path}${page.path}`

    return createPage({
      ...page,
      path: localizedPath,
      context: {
        locale: lang,
        name,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = require.resolve('./src/templates/post.jsx')
  const categoryTemplate = require.resolve('./src/templates/category.jsx')

  const result = await wrapper(
    graphql(`
      {
        posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
          edges {
            node {
              id
              uid
              lang
            }
          }
        }
        categories: allPrismicCategory {
          edges {
            node {
              lang
              data {
                name
              }
            }
          }
        }
      }
    `)
  )

  const postsList = result.data.posts.edges
  const categoryList = result.data.categories.edges

  postsList.forEach(edge => {
    // The uid you assigned in Prismic is the slug!
    createPage({
      path: localizedSlug(edge.node),
      component: postTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
        locale: edge.node.lang,
      },
    })
  })

  categoryList.forEach(c => {
    const category = c.node.data.name
    const { lang } = c.node

    const localizedPath = locales[lang].default
      ? `/categories/${_.kebabCase(category)}`
      : `/${locales[lang].path}/categories/${_.kebabCase(category)}`

    createPage({
      path: localizedPath,
      component: categoryTemplate,
      context: {
        category,
        locale: lang,
      },
    })
  })
}
