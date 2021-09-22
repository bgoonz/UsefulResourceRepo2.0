module.exports = ({ contentPath = "posts", basePath = "/" }) => ({
  siteMetadata: {
    siteTitle: `Tech Blog`,
    siteUrl: `https://willjw3.github.io`,
    siteDescription: `Minimalistic Gatsby theme for creating a blog with posts in MDX.`,
    author: `willjw3`,
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentPath,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [`gatsby-remark-responsive-iframe`],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Raleway`,
          `Lacquer`,
          `Rubik`,
          `Helvetica Neue`,
          `Helvetica`,
          `Arial`,
          `sans-serif`,
          `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
      },
    },
  ],
});
