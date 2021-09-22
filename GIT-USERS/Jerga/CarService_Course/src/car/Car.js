const i = require("../lib/i");

class Car {
  brand = "";
  type = "";
  produceYear = null;
  id = null;

  testingData = "Testing Data";

  constructor(carData) {
    this.brand = carData.brand;
    this.type = carData.type;
    this.produceYear = carData.year;
    this.id = "_" + Math.random().toString(36).substr(2, 9);
  }

  getDate = (date) => (this.carDate = date);

  setCarDate() {
    i.getCurrentDate(this.getDate);
  }

  displayInfo(additionalInfo) {
    if (additionalInfo) {
      console.log(
        `${this.id}: ${this.brand} ${this.type} - ${this.produceYear} - ${additionalInfo}`
      );
    } else {
      console.log(
        `${this.id}: ${this.brand} ${this.type} - ${this.produceYear}`
      );
    }

    return true;
  }
}

module.exports = Car;
