module.exports = {
  plugins: [
    `gatsby-plugin-mdx`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Orbitron`,
          `Raleway`,
          `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
  ],
};
