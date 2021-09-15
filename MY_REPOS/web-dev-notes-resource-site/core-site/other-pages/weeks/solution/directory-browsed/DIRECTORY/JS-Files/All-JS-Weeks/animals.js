// Create an Animal class that takes in a name as an argument
// Add a sayHello method to the class that prints "<<name>> says hello!"
// Do both of these requirements using a constructor function (ES5)

function Animal(name) {
	this.name = name;
}

Animal.prototype.sayHello = function() {
	console.log(`${this.name} says hello!`);
};

// Create the same class and instance method using ES6
// (We're practicing each syntax. Make sure to test each implementation by commenting one out at a time.)

// class Animal {
// 	constructor(name) {
// 		this.name = name;
// 	}

// 	sayHello() {
// 		console.log(`${this.name} says hello!`);
// 	}
// }

// Create a Pig class that inherits from the Animal class
// Have the Pig class also take in a ribbonColor as an argument
// Add a showOff method to the class that prints "<<name>> has a <<color>> ribbon!"
// If the ribbon is blue, have the showOff method instead print "<<name>> has a <<color>> ribbon! Wow!!"
// Use ES6 syntax

class Pig extends Animal {
	constructor(name, ribbonColor) {
		super(name);
		this.ribbonColor = ribbonColor;
	}

	showOff() {
		let message = `${this.name} has a ${this.ribbonColor} ribbon!`;
		if (this.ribbonColor === 'blue') {
			message += ' Wow!!';
		}
		console.log(message);
	}
}

// Export both the Animal class and the Pig class using CommonJS (not ES Modules)

module.exports = { Animal, Pig };

// module.exports.Animal = Animal
// module.exports.Pig = Pig

// exports.Animal = Animal
// exports.Pig = Pig
