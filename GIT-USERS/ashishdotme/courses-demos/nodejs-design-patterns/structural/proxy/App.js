const { lock, unlock } = require("./Vault");
const password = "secretttt";

const obj = {
  name: "Ansu",
  age: 23,
  city: "Chicago",
  country: "US",
};

const person = lock(obj, password);
person.sex = "Male";
console.log(person);

const unlocked = unlock(person, password);
console.log(unlocked);
