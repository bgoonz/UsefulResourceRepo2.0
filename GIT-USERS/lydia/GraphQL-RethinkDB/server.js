const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(4000, _=> {
  console.log('listening on localhost:4000')
})
