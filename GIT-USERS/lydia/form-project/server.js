const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(expressValidator())
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render('home')
})

app.post("/", (req, res) => {
  req
    .checkBody("fullName", "You must give me your email")
    .notEmpty();

  req
    .checkBody("email", "We need your full name")
    .notEmpty();

  req
    .checkBody("birthyear", "We need your full name")
    .notEmpty();

  req
    .checkBody("position", "We need a valid position")
    .notEmpty();

  req
    .checkBody("password", "We need a password")
    .notEmpty();

  const errors = req.validationErrors()
  console.log(errors)
  if (errors){
    const data = {
      errors: errors
    }
    res.render('home', data)
  }else{
      res.render('result', {
        fullName: req.body.fullName,
        email: req.body.email,
        birthyear: req.body.birthyear,
        position: req.body.position,
        password: req.body.password
      })
  }
});


app.listen(3000, () => {
  console.log('Listening on port 3000')
});
