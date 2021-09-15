const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");

const config = require("../config/index");

const jwt = require("jsonwebtoken");

exports.getUser = (req, res) => {
  const requestedUserId = req.params.id;
  const user = res.locals.user;

  if (requestedUserId === user.id) {
    // Display all
    User.findById(requestedUserId, (err, foundUser) => {
      if (err) {
        return res.status(422).send({
          errors: normalizeErrors(err.errors),
        });
      }
      return res.json(foundUser);
    });
  } else {
    User.findById(requestedUserId)
      .select("-revenue -stripeCustomerId -password")
      .exec((err, foundUser) => {
        if (err) {
          return res.status(422).send({
            errors: normalizeErrors(err.errors),
          });
        }

        return res.json(foundUser);
      });
  }
};

exports.auth = (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      err: [{ title: "Data missing!", detail: "Provide email and password" }],
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(422).send({
        errors: normalizeErrors(err.errors),
      });
    }

    if (!user) {
      return res.status(422).send({
        err: [{ title: "Invalid User!", detail: "User does not exist" }],
      });
    }

    if (user.hasSamePassword(password)) {
      //  return JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
        },
        config.SECRET,
        { expiresIn: "1h" }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        err: [{ title: "Wrong Data!", detail: "Wrong email or password" }],
      });
    }
  });
};

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      err: [{ title: "Data missing!", detail: "Provide email and password" }],
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      err: [
        {
          title: "Invalid Password!",
          detail: "Password isn't the same as confirmation",
        },
      ],
    });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(422).send({
        errors: normalizeErrors(err.errors),
      });
    }
    if (existingUser) {
      return res.status(422).send({
        err: [
          {
            title: "Invalid Email!",
            detail: "User with this email already exist",
          },
        ],
      });
    }
    const user = new User({
      username,
      email,
      password,
    });
    user.save((err) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json({ registered: true });
    });
  });
};

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, (err, user) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function parseToken(token) {
  return jwt.verify(token.split(" ")[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({
    err: [
      {
        title: "Not authorized!",
        detail: "You need to login to get access",
      },
    ],
  });
}
