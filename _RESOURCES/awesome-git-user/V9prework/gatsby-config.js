module.exports = {
  siteMetadata: {
    title: `Struck By Meteorites`,
    description: `Chingu Voyage 9 prework project. This app gives data on meteorite strikes around the world by calling a nasa API.`,
    author: `willjw3`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `meteorite-strikes`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Raleway`,
          `Orbitron`,
          `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
