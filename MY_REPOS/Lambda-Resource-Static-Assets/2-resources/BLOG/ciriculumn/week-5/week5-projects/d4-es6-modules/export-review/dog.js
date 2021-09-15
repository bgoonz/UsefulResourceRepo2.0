const { Animal } = require('./animal');


// or 
// const content = require('./animal');
// const Animal = content.Animal

class Dog extends Animal {
	constructor(name, age) {
		super(name, age)
		this.tricks = [];
	}

	speak() {
		console.log(`${this.name} barks`);
	}

	learnNewTrick(trick) {
		this.tricks.push(trick);
		console.log(`New trick learned: ${trick}`)
	}

	performTricks() {
		this.tricks.forEach(trick => {
			console.log(`${this.name} performs trick: ${trick}`)
		})
	}
}

module.exports = { Dog: Dog };
// module.exports = { Dog };
// module.exports.Dog = Dog;



