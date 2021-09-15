const User = require("../models/User");

const createUserByEmailPassword = ({
  email,
  isAdmin = false,
  name,
  password,
}) => User.query().insert({ email, isAdmin, name, password });

module.exports = createUserByEmailPassword;
