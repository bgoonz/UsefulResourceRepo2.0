require('dotenv').config({
  path: `.env`,
})

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-theme-events`,
      options: {
        sanity: {
          projectId: process.env.SANITY_PROJECT_ID,
          dataset: process.env.SANITY_DATASET,
          token: process.env.SANITY_TOKEN,
          overlayDrafts: !isProduction,
          watchMode: !isProduction,
        },
      },
    },
  ],
}
