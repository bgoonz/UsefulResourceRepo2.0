require('dotenv').config();

module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-plugin-modal']
      }
    }
  ]
};
