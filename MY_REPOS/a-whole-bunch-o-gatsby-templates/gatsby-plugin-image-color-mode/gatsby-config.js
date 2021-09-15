module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: "gatsby-plugin-image-color-mode",
  },
  plugins: [
    "@chakra-ui/gatsby-plugin",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      }
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`
  ],
};
