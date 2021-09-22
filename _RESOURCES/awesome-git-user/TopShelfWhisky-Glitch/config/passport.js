var passport = require("passport");
var User = require("../models/user");
var LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      req.checkBody("email", "Invalid Email").notEmpty().isEmail();
      req
        .checkBody("password", "Invalid password")
        .notEmpty()
        .isLength({ min: 4 });
      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach((error) => {
          messages.push(error.msg);
        });
        return done(null, false, req.flash("error", messages));
      }
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: "Email is already in use" });
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err, result) => {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      req.checkBody("email", "Invalid Email").notEmpty().isEmail();
      req.checkBody("password", "Invalid password").notEmpty();
      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach((error) => {
          messages.push(error.msg);
        });
        return done(null, false, req.flash("error", messages));
      }
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "No user found." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Invalid password." });
        }
        return done(null, user);
      });
    }
  )
);
