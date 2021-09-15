require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'LekoArts Statistics',
    url: 'https://lekoarts-stats.netlify.app',
    repo: 'https://github.com/LekoArts/lekoarts-stats',
    github: 'https://www.github.com/LekoArts',
    twitter: 'https://www.twitter.com/lekoarts_de',
    homepage: 'https://www.lekoarts.de',
    image: '/social.png',
    author: '@lekoarts_de',
    description: `Dashboard of LekoArts' GitHub and Twitter statistics over time, visualized with fancy graphs.`,
  },
  flags: {
    DEV_SSR: false,
    FAST_DEV: true,
  },
  plugins: ['gatsby-plugin-lodash', 'gatsby-plugin-react-helmet'],
}
