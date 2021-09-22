module.exports = {
  plugins: [
    `@willjw3/gatsby-theme-techblog`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Rubik`,
          `Lacquer`,
          `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
  ],
};
