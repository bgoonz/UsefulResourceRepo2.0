/*
# Write a method that takes in a number and returns true if it is a
# power of 2. Otherwise, return false.
*/

function powerOfTwo(num) {
  if (num < 1) return false;
  while (num > 0) {
    if (num === 1) {
      return true;
    } else if (num % 2 === 0) {
      num /= 2;
    } else {
      return false;
    }
  }
};

console.log(powerOfTwo(1))
console.log(powerOfTwo(16))
console.log(powerOfTwo(64))
console.log(powerOfTwo(78))
console.log(powerOfTwo(0))
