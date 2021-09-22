const User = require("../models/users");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const db = require("../util/db");
const key = require("../util/key");

exports.getUsers = function (req, res) {
  User.find({}).exec((errors, users) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    return res.json(users.email);
  });
};

exports.getCurrentUser = function (req, res, next) {
  const email = req.user;

  if (!email) {
    return res.sendStatus(422);
  }

  jwt.sign({ email }, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
    return res.json({
      success: true,
      token: "Bearer " + token,
      email,
    });
  });
};

exports.getSecret = function (req, res) {
  return res.json({ secret: "I am secret Message" });
};

exports.consumer = function (req, res) {
  const consumerData = req.body;
  console.log(consumerData);

  /*    if (consumerData.cPassword !== consumerData.cPasswordConf) {
           return res.status(422).json({
               errors: {
                   cPasswordConf: 'is not  the same as confermation password'
               }
           })
       } */

  const userConsumer = new User(consumerData);
  return userConsumer.save((errors, savedConsumer) => {
    if (errors) {
      console.log(errors);
      return res.status(422).json({ errors });
    } else {
      return res.json(savedConsumer);
    }
  });
};

// const userLogin = new User(loginData);
//   const email =req.body.email
//const login =req.body.login
exports.login = function (req, res, next) {
  const email = req.body.email; //'draj.8126@gmail.com'
  const password = req.body.password; //'dheeraj'

  console.log(email);

  if (!email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }
  if (!password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  User.fetchUser(email, password)
    .then(([rows]) => {
      console.log("AFTER");
      if (rows.length > 0) {
        console.log(rows[0].email);
        // res.json({ msg: 'success' })

        const payload = { email: rows[0].email }; // jwy payload
        console.log("PAYLOAD");
        console.log(payload);

        //user matched
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              email,
            });
          }
        );
      } else {
        console.log("error");
        return res.status(404).json({ error: "invalid credentials" });
      }
    })

    .catch((err) => console.log(err));
};

exports.logout = function (req, res, next) {
  req.logout();
  return res.json({ status: "session dis" });
};
