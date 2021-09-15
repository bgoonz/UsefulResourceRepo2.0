require('dotenv').config()

module.exports = {
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "notes",
        path: "./notes/",
      },
      __key: "notes",
    },
    {
      resolve: "gatsby-source-instagram",
      options: {
        // If you can't provide an access_token and instagram_id use the public scraping
        // by only providing the "username" as an ID:
        // https://github.com/oorestisime/gatsby-source-instagram#public-scraping-for-posts
        username: "lekoarts.de",
        access_token: process.env.ACCESS_TOKEN,
        instagram_id: process.env.BUSINESS_ID,
        maxPosts: 4,
        hashtags: false,
      },
    },
  ],
}
