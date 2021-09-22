const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const keys = require("../util/key");
const db = require("../util/db");
const User = require("../models/users");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    let payLoadEmail = jwt_payload.email;

    User.fetchLogedInUser(payLoadEmail)
      .then(([rows]) => {
        if (rows.length > 0) {
          return done(null, rows[0].email);
        }
        return done(null, false);
      })
      .catch((err) => console.log(err));
  })
);
