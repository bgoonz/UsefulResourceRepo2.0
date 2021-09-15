module.exports = {
  pathPrefix: "/gatsby-plugin-modal",
  siteMetadata: {
    title: `gatsby-plugin-modal - example site`,
    description: ``,
    author: `@greglobinski`,
  },
  __experimentalThemes: [
    {
      resolve: `gatsby-plugin-modal`,
      options: {
        wrapper: false,
      },
    },
  ],
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/templates/mdx-page-template.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
        ],
      },
    },
  ],
}
