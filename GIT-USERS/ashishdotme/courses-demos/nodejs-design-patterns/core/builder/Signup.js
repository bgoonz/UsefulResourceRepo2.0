const User = require("./User");

class Signup {
  // use destructuring to take paramters from this
  async create({ name, email, age }) {
    await new User(name, email, age);
  }
}

module.exports = new Signup();
