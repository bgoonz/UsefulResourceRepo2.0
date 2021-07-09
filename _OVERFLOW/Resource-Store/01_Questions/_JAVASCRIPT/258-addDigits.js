/**
 * @param {number} num
 * @return {number}
 */
const addDigits = num => {
  while (num > 9) {
    num = getTotal(num);
  }
  return num;
};

var getTotal = num => {
  let total = 0;
  let dig = 0;
  while (num > 9) {
    dig = num % 10;
    total += dig;
    num = Math.floor(num / 10);
  }
  return total + num;
};
