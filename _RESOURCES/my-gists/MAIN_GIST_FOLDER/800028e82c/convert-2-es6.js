// Convert the Following from ES5 to ES6 Syntax
// 1. Convert the function to an ES6 Arrow Function
const golden = () => {
  console.log("this is golden!!!!");
}

golden()

// 2. Simplify the following with es6 enhanced object literals
const newFunction = function literal(firstName, lastName){
  return {
    firstName,
    lastName,
    fullName: () => {
      console.log(firstName + " " + lastName)
      return;
    }
  }
}

newFunction("William", "Imoh").fullName()

// 3. Condense this to 8 lines with destructuring
const {firstName, lastName, destination, occupation, spell} = {
  firstName: "Harry",
  lastName: "Potter Holt",
  destination: "Hogwarts React Conf",
  occupation: "Deve-wizard Avocado",
  spell: "Vimulus Renderus!!!"
}
console.log(firstName, lastName, destination, occupation)

// 4. Combine these arrays with array spreading
const west = ["Will", "Chris", "Sam", "Holly"]

const east = ["Gill", "Brian", "Noel", "Maggie"]

const combined = [...west, ...east]

console.log(combined)

// 5. Tidy up this multi-line string using Template Literals
const planet = "earth"
const view = "glass"
var before = `Lorem ${view} dolor sit amet consectetur adipiscing elit ${planet} do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`;

console.log(before)
