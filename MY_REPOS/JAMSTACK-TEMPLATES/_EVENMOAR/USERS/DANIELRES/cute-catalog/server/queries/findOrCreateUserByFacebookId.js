const User = require("../models/User");

const findOrCreateUserByFacebookId = async (params) => {
  const { facebookId } = params;

  const user =
    (await User.query().where({ facebookId }))[0] ||
    (await User.query().insert(params));

  return user;
};

module.exports = findOrCreateUserByFacebookId;
