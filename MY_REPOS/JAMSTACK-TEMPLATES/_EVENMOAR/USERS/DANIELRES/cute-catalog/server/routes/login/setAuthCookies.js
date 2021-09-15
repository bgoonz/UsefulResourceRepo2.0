const createToken = require("../../helpers/jwt/createToken");

const setAuthCookies = ({ res, user }) => {
  const maxAge = process.env.AUTH_DURATION * 1000;
  const payload = { userId: user.id };
  const token = createToken({ payload });

  res.cookie("auth", token, {
    httpOnly: true,
    maxAge,
    secure: process.env.DISABLE_SECURE_TOKEN !== "true",
  });
  res.cookie("authExpiresAt", Date.now() + maxAge, { maxAge });
};

module.exports = setAuthCookies;
