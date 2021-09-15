const jwt = require("jsonwebtoken");

const createToken = ({
  payload,
  secret = process.env.AUTH_SECRET,
  expiresIn: _expiresIn = process.env.AUTH_DURATION,
}) => {
  const expiresIn = parseInt(_expiresIn);
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });

  return token;
};
module.exports = createToken;
