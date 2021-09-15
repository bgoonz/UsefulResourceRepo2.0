const fruits = ["Apples", "Oranges", "Kiwi", "Strawberries"];

function* fruitSalad() {
  for (const fruit of fruits) {
    yield fruit;
  }
}

const getFruits = fruitSalad();

function makeSalad() {
  const fruit = getFruits.next();
  if (!fruit.done) {
    console.log(fruit.value);
    makeSalad();
  }
}

makeSalad();
