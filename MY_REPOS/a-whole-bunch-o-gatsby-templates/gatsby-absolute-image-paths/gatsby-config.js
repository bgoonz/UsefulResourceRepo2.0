const camelCase = require("lodash.camelcase")

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
  siteMetadata: {
    title: "issue-31380",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "src/images",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "src/data",
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: ({ node }) => capitalize(camelCase(`LocalContent ${node.name}`))
      },
    },
  ],
};
