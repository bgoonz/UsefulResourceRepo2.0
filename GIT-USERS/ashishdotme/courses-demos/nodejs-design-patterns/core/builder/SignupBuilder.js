const Signup = require("./Signup");

class SignupBuilder {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  setAge(age) {
    this.age = age;
    return this;
  }

  create() {
    return Signup.create(this); // this is an object with all the properties set
  }
}

module.exports = new SignupBuilder();
