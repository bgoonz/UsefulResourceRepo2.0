require('dotenv').config({
  path: `.env`,
})

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  siteMetadata: {
    title: `Normal`,
  },
  plugins: [
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        overlayDrafts: !isProduction,
        watchMode: !isProduction,
      },
    },
  ],
}
