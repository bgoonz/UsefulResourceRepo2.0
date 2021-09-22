const express = require('express')
const mustacheExpress = require('mustache-express')
const data = require('./users.js')
const app = express()
app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.use(express.static('public'))

app.get('/', (request, response) => {
  response.render('index', data)
})

app.get('/user/:username', (request, response) => {
  const username = request.params.username;
  let user;
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].username === username) {
      user = data.users[i];
      break;
    }
  }
  response.render('user', user)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
