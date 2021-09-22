const readline = require("readline-sync");
const Car = require("./Car");

class CarManager {
  askQuestion(question) {
    let answer = readline.question(question);

    if (!answer) {
      answer = this.askQuestion(question);
    }

    return answer;
  }

  createCar() {
    const brand = this.askQuestion("Brand of the car: \n");
    const type = this.askQuestion("Type of the car: \n");
    const year = this.askQuestion("Year of the car: \n");

    return new Car({ brand, type, year: parseInt(year, 10) });
  }
}

module.exports = CarManager;
