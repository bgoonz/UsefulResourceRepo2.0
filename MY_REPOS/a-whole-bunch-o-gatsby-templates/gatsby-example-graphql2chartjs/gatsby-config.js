module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'SWAPI',
        fieldName: 'swapi',
        url: 'https://gatsby-example-graphql2chartjs.herokuapp.com/'
      }
    }
  ]
}