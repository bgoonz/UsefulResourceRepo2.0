const Car = require("./Car");

class FancyCar extends Car {
  constructor(brand, model, year) {
    super(brand, model, year);
    this.priority = "HIGH PRIORITY";
  }

  getStatus() {
    console.log("2 hours to finish repair");
  }

  displayCarInformations() {
    console.log("I AM SUPER FANCY CAR!!!!");
    super.displayCarInformations();
  }
}

module.exports = FancyCar;
