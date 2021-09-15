require('dotenv').config({
  path: `.env`,
})

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-potterapi',
      options: {
        key: process.env.KEY,
      },
    },
    'gatsby-plugin-netlify',
  ],
}
