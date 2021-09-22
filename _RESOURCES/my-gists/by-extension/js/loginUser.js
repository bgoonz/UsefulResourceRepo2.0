const loginUsers = (req, res, next) => {
  const loginKeys = Object.keys(req.body);
  const required = ["email", "password"];
  const verifyRequired = required.every((key) => {
    return loginKeys.includes(key);
  });

  if (!verifyRequired)
    return res
      .status(422)
      .send({ error: "Please fill in all required fields." });

  if (req.body.email.length === 0)
    return res.status(422).send({ error: "Please type in your email." });

  if (req.body.password.length === 0)
    return res.status(422).send({ error: "Please type in your password." });

  return passport.authenticate("local", function (err, passportUser) {
    try {
      if (err) throw new Error(err);

      if (passportUser) {
        req.login(passportUser, function (err) {
          if (err) {
            return res.status(422).send({ errors: "Unable to create session" });
          }

          return res.json(passportUser);
        });
      } else {
        return res.status(422).send({ errors: "Something wen wrong" });
      }
    } catch (e) {
      const msg = e.message.split(":").pop().trim();
      return res.status(422).send({ errors: msg });
    }
  })(req, res, next);
};
