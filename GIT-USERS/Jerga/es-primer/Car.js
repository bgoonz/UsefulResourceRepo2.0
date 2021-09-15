class Car {
  constructor(brand = "Default Brand", model = "Default Model", year) {
    this.brand = brand;
    this.model = model;
    this.year = year || 2000;
  }

  displayCarInformations() {
    console.log(this.brand + " " + this.model + " " + this.year);
  }
}

module.exports = Car;
