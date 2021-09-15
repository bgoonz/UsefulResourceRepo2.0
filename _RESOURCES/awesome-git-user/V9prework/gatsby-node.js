/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allStrike {
              edges {
                node {
                  id
                  fall
                  latitude
                  longitude
                  mass
                  name
                  nametype
                  recclass
                  year
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }

        // ...

        // Create blog-list pages
        const strikes = result.data.allStrike.edges
        const strikesPerPage = 100
        const numPages = Math.ceil(strikes.length / strikesPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/` : `/${i + 1}`,
            component: path.resolve("./src/templates/strike-list.js"),
            context: {
              limit: strikesPerPage,
              skip: i * strikesPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
        })
      })
    )
  })
}
