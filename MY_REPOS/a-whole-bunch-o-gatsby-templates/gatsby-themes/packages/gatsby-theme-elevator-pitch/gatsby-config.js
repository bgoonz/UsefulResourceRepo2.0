require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Gatsby.js 'Elevator Pitch' theme`,
    url: `https://github.com/greglobinski/gatsby-themes/tree/master/packages/gatsby-theme-elevator-pitch`,
    image: 'preview.jpg',
    language: 'en',
    description: 'coming soon...',
    socialLinks: {
      github: 'https://github.com/greglobinski',
      twitter: 'https://twitter.com/greglobinski',
      mailto: 'mailto:greglobinski@gmail.com',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `elevator-pitch-screens`,
        path: `content/elevator-pitch/screens`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `elevator-pitch-demo-screens`,
        path: `${__dirname}/content/screens`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `elevator-pitch-images`,
        path: `content/elevator-pitch/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `elevator-pitch-demo-images`,
        path: `${__dirname}/content/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-elevator-pitch'],
      },
    },
  ],
};
