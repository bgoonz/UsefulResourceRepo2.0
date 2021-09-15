const User = require("../models/User");

const countUsers = async () => {
  const response = (await User.query().count())[0].count;
  return parseInt(response);
};

module.exports = countUsers;
