const Car = require("./Car");

class RacingCar extends Car {
  category = "";

  constructor({ category, ...carParams }) {
    super(carParams);
    this.category = category;
  }

  racingCarFunction() {
    console.log("racing car function");
  }

  displayInfo() {
    super.displayInfo(this.category);
    // console.log(this.category);
    return true;
  }
}

module.exports = RacingCar;
