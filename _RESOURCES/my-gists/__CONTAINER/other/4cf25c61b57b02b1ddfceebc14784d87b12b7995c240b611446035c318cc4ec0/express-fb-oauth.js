const express = require('express');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

const CLIENT_ID = process.env.CLIENT_ID || require('./config/facebook.json').ClientId;
const CLIENT_SECRET = process.env.CLIENT_SECRET || require('./config/facebook.json').ClientSecret;
const PORT = process.env.PORT || 3000;

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
}, (accessToken, refreshToken, profile, cb) => {
  // Could save user to app db
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
app.get('/', (req,res) => res.redirect('/api/login'));
app.get('/api/login', (req, res) => {
  res.render('login');
});

app.get('/api/auth/facebook', passport.authenticate('facebook'));
app.get('/api/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/api/login'}), (req, res) => {
    res.json('success!').status(200);
  });

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});