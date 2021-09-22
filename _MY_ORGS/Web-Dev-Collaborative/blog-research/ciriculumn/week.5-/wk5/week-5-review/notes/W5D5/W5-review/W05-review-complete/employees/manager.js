// Create a Manager class that inherits from the Employee class you created.
// Have the Manager also take in the number of employees they manage as an argument
// Add a teamSize method that prints "<<name>> manages <<numEmployees>> employees."

const Employee = require('./employee');

class Manager extends Employee {
	constructor(name, department, numEmployees) {
		super(name, department);
		this.numEmployees = numEmployees;
	}

	teamSize() {
		console.log(`${this.name} manages ${this.numEmployees} employees.`);
	}
}

// Export the Manager class using CommonJS so that we don't have to destructure later on.

module.exports = Manager;

// Doing any of the following would require us to destructure our import
// module.exports = { Manager }
// module.exports.Manager = Manager
// exports.Manager = Manager;
