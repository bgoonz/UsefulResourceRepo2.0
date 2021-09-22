const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static('public'))

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

const authenticate = (req, res, next) => {
  if (req.query.username === "username" && req.query.password === "password") {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/login', (req, res) => {
  console.log("logging in");
  res.render('login');
})

app.use(authenticate);
app.get("/", (req, res) => {
  console.log("Home");
  res.render('index');
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
