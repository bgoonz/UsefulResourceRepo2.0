const Car = require("./Car");
const FancyCar = require("./FancyCar");
const CarService = require("./services/CarService");

const carService = new CarService("SuperCars", "Spain, Malaga");

// carService.getSecretDocuments().then((superSecretDocuments) => {
//   console.log(superSecretDocuments);
// }).catch((err) => {
//   console.log(err);
// });

const docObservable = carService.getSecretDocuments();

docObservable.subscribe({
  next: (secretDocs) => {
    console.log(secretDocs);
  },
  error: (error) => {
    console.log(error);
  },
  complete: () => {},
});

// const car1 = new Car();
// const car2 = new Car('ford', 'fiesta', 2000);
// const car3 = new Car('fiat', 'punto', 2011);
// const car4 = new Car('toyota', 'yaris', 2003);

// const car5 = new FancyCar('mercedes', 'benz', 2018);
// car5.displayCarInformations();

// carService.addCar(car1);
// carService.addCar(car2);
// carService.addCar(car3);
// carService.addCar(car4);

// [...rest] = carService.getAllCars();

// const allCars = carService.getAllCars();

// const newArray = [];

// newArray.push(...allCars);

// const {brand, model, year } = car1;

// const carBrand = car1.brand;
// const carModel = car1.model;
