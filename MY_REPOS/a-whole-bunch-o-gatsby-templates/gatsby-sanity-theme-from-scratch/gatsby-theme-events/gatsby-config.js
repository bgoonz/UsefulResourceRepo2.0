module.exports = ({ sanity, basePath = `/events` }) => ({
  siteMetadata: {
    title: 'Gatsby Theme Events',
    basePath,
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: sanity.projectId,
        dataset: sanity.dataset,
        token: sanity.token,
        overlayDrafts: sanity.overlayDrafts,
        watchMode: sanity.watchMode,
      },
    },
  ],
})
