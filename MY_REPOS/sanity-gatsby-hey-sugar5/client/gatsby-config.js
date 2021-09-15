const sanity = require("../tracker/sanity.json")

module.exports = {
  siteMetadata: {
    title: `Gatsby HeySugar Client`,
    description: `Display blood sugar test results with Jamstack.`,
    author: `@jamiebradley234`,
  },
  plugins: [
    {
      resolve: "@hey-sugar/gatsby-theme-heysugar",
      options: {
        sanity: {
          projectId: sanity.api.projectId,
          dataset: sanity.api.dataset,
          watchMode: false,
          overlayDrafts: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
