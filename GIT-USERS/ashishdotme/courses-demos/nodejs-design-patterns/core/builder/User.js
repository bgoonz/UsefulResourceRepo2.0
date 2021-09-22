class User {
  constructor(name, age, email) {
    return new Promise((resolve, reject) => {
      this.name = name;
      this.age = age;
      this.email = email;
      resolve(this.displayInfo());
    });
  }

  displayInfo() {
    console.log(`${this.name} - ${this.email}`);
  }
}

module.exports = User;
