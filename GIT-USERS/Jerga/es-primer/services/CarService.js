const Promise = require("../Promise");
const Observable = require("../Observable");

function forEach(array, callbackFunction) {
  for (let i = 0; i < array.length; i++) {
    const arrayElement = array[i];

    callbackFunction(arrayElement);
  }
}

class CarService {
  constructor(name, country) {
    this.name = name;
    this.country = country;

    this.carsToRepair = new Array();
  }

  addCar(car) {
    car.brand === "toyota"
      ? console.log("I cannot add toyota!!!!")
      : this.carsToRepair.push(car);
  }

  displayCustomName() {
    console.log("I am custom name function");
  }

  displayAllCars() {
    forEach(this.carsToRepair, (car) => {
      this.displayCustomName();
      car.displayCarInformations();
    });

    // this.carsToRepair.forEach(function(car) {
    //   car.displayCarInformations();
    // });
  }

  getAllCars() {
    return this.carsToRepair;
  }

  getSecretDocuments() {
    // return new Promise((resolve, reject) => {
    //   setTimeout(function() {
    //     let secretDocs = 'SUPER SECRET DOCUMENTS, DONT SHARE';
    //     reject(secretDocs);

    //   }, 2000);
    // });

    return new Observable((observer) => {
      setTimeout(function () {
        let secretDocs = "SUPER SECRET DOCUMENTS, DONT SHARE";
        observer.next(secretDocs);
        observer.next("secretDocs1");

        observer.complete();

        observer.next("secretDocs2");
        observer.next("secretDocs3");
      }, 2000);
    });
  }
}

module.exports = CarService;
