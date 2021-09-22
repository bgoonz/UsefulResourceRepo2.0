const rss = require("./utils/rss-options");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Place to learn coding",
    description: "The best resource to learn coding online",
    siteUrl: process.env.BASE_URL,
    body: {
      content: "Just some SEO content",
    },
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-feed",
      options: rss.options,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              aliases: {
                es6: "js",
              },
            },
          },
        ],
      },
    },
    "gatsby-plugin-react-helmet",
  ],
};
