// Add statements to this file that would allow us to use the classes you created.
// Running this file in node should produce the expected output.

const { Animal, Pig } = require('./animals');

// const Animals = require('./animals');
// const Animal = Animals.Animal;
// const Pig = Animals.Pig;

const Employee = require('./employees/employee');
const Manager = require('./employees/manager');

const rudy = new Pig('Rudy', 'red');
const babe = new Pig('Babe', 'blue');
const mystery = new Animal('Blort');

rudy.sayHello(); // Rudy says hello!
rudy.showOff(); // Rudy has a red ribbon!
babe.sayHello(); // Babe says hello!
babe.showOff(); // Babe has a blue ribbon! Wow!!
mystery.sayHello(); // Blort says hello!

const bill = new Employee('Bill', 'Human Resources');
const sarah = new Manager('Sarah', 'Accounting', 20);

bill.introduceSelf(); // Hi, I'm Bill. I work in Human Resources.
sarah.introduceSelf(); // Hi, I'm Sarah. I work in Accounting.
sarah.teamSize(); // Sarah manages 20 employees.
