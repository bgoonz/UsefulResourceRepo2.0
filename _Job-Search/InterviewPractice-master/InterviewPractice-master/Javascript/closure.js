/*  createAdder(baseNumber)
        return add(numberToAdd) {
            add up base number and number to add
        }
*/

function createAdder(baseNumber) {
  return (numberToAdd) => {
    return baseNumber + numberToAdd;
  };
}

const addTen = createAdder(10);
console.log(addTen(2));
