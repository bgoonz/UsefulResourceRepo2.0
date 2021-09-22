module.exports = {
  siteMetadata: {
    title: `WILL WARD`,
    description: `Personal blog site of William Ward, software developer and educator.`,
    author: `willjw3`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify-cms-paths`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-responsive-iframe`,
          `gatsby-plugin-netlify-cms-paths`,
          `gatsby-remark-images`,
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/articles`,
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
        name: `info`,
        path: `${__dirname}/info`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-netlify-cms`,
    {
      resolve: "gatsby-plugin-excerpts",
      options: {
        sources: {
          snippetBlocks: {
            type: "htmlQuery",
            sourceField: "html",
            excerptSelector: ".custom-block.snippet .custom-block-body",
            stripSelector: "a",
            elementReplacements: [
              {
                selector: "h6",
                replaceWith: "strong",
              },
              {
                selector: "h5",
                replaceWith: "h6",
              },
              {
                selector: "h4",
                replaceWith: "h5",
              },
              {
                selector: "h3",
                replaceWith: "h4",
              },
              {
                selector: "h2",
                replaceWith: "h3",
              },
            ],
          },
          default: {
            type: "htmlQuery",
            sourceField: "html",
            excerptSelector: "html > *",
            ignoreSelector: ".gatsby-highlight",
            stripSelector: "a",
            elementReplacements: [
              {
                selector: "h6",
                replaceWith: "strong",
              },
              {
                selector: "h5",
                replaceWith: "h6",
              },
              {
                selector: "h4",
                replaceWith: "h5",
              },
              {
                selector: "h3",
                replaceWith: "h4",
              },
              {
                selector: "h2",
                replaceWith: "h3",
              },
            ],
            truncate: {
              length: 120,
              byWords: true,
              ellipsis: "…",
            },
          },
        },
        sourceSets: {
          markdownHtml: ["snippetBlocks", "default"],
        },
        excerpts: {
          snippet: {
            type: "html",
            nodeTypeSourceSet: {
              MarkdownRemark: "markdownHtml",
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Bebas Neue`,
          `Cinzel`,
          `Special Elite`,
          `Lusitana`,
          `Raleway`,
          `Rubik`,
          `Orbitron`,
          `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
        display: "swap",
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
