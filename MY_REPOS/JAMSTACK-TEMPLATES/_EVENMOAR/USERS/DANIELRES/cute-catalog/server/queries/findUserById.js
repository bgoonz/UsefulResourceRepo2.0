const User = require("../models/User");

const findUserById = (id) => User.query().findById(id);

module.exports = findUserById;
