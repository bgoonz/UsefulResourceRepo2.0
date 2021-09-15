// Create an Employee class that takes in a name and department
// Add an introduceSelf method that prints "Hi, I'm <<name>>. I work in <<department>>."

class Employee {
	constructor(name, department) {
		this.name = name;
		this.department = department;
	}

	introduceSelf() {
		console.log(`Hi, I'm ${this.name}. I work in ${this.department}.`);
	}
}

// Export the Employee class using CommonJS so that we don't have to destructure later on.

module.exports = Employee;

// Doing any of the following would require us to destructure our import
// module.exports = { Employee }
// module.exports.Employee = Employee
// exports.Employee = Employee;
