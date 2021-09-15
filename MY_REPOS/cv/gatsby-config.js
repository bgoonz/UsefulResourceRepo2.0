module.exports = {
  siteMetadata: {
      description: "Personal page of Bryan Guner",
      locale: "en",
      title: "Bryan Guner",
  },
  plugins: [
      {
          resolve: "@wkocjan/gatsby-theme-intro",
          options: {
              basePath: "/",
              contentPath: "content/",
              showThemeLogo: true,
              theme: "classic"
          }
      }
  ]
}