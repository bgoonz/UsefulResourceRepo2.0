const path = require("path");

module.exports = {
  siteMetadata: {
    title: `Will Ward`,
    description: `Professional website of Will Ward, full-stack web developer.`,
    author: `willjw3`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `info`,
        path: `${__dirname}/info`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tech`,
        path: `${__dirname}/tech`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Raleway`, `source sans pro\:300, 400,400i,700`],
        display: `swap`,
      },
    },
  ],
};
