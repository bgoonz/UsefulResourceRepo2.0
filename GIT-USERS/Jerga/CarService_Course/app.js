const CarStorage = require("./src/car/CarStorage");
const CarManager = require("./src/car/CarManager");
const Car = require("./src/car/Car");
const RacingCar = require("./src/car/RacingCar");
const readline = require("readline-sync");

const i = require("./src/lib/i");

function runApp() {
  function displayOptions() {
    console.log('Press "1" to add a car');
    console.log('Press "2" to remove a car');
    console.log('Press "3" to list all of the cars');
    console.log('Press "exit" to quit to program');
  }
  const car = new Car({ brand: "mercedes", type: "benz", year: 1995 });
  const car2 = new Car({ type: "lancer", brand: "mitshubishi", year: 2002 });
  const car3 = new Car({ type: "x6", brand: "bmw", year: 2000 });
  const car4 = new Car({ type: "x4", brand: "bmw", year: 2005 });
  const racingCar = new RacingCar({
    category: "k1",
    brand: "subaru",
    type: "impreza",
    year: 2010,
  });

  const cars = [car, car2, racingCar, car3, car4];
  const carStorage = new CarStorage([...cars]);
  const carManager = new CarManager();

  let appIsRunning = true;
  displayOptions();

  while (appIsRunning) {
    let userInput = readline.question("Write me something: ").toLowerCase();

    switch (userInput) {
      case "1":
        const newCar = carManager.createCar();
        carStorage.addCar(newCar);
        break;
      case "2":
        const carId = carManager.askQuestion("Provide car id: \n");
        carStorage.removeCar(carId);
        break;
      case "3":
        carStorage.listCars();
        break;
      case "exit":
        console.log("Good Bye!");
        appIsRunning = false;
        break;
      default:
        console.log("Invalid Option!");
    }
  }
}

// runApp();

const runTestApp = async function () {
  const car = new Car({ brand: "mercedes", type: "benz", year: 1995 });
  car.setCarDate();

  if (
    car.brand === "mercedes" &&
    car.type === "lancer" &&
    car.produceYear === 1995
  ) {
    console.log("Its mercedez bens");
  }

  i.getDBdata().subscribe(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    },
    () => {
      console.log("Finished!");
    }
  );

  console.log("finishing of runTestApp!");
};

runTestApp();
