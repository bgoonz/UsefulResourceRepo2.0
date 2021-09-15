const User = require("../models/User");

const findUserByEmailPassword = async ({ email, password }) => {
  const user = await User.query().first().where({ email });

  if (!user) return null;

  const isPasswordValid = await user.verifyPassword(password);

  if (!isPasswordValid) return null;

  return user;
};

module.exports = findUserByEmailPassword;
