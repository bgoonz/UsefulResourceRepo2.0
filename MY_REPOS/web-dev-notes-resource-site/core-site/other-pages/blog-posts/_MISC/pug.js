const path = require('path')
const express = require('express')
const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/about', (req, res) => {
  res.render('about', { name: 'Flavio' })
})
