/*
# Write a method that takes an array of numbers. If a pair of numbers
# in the array sums to zero, return the positions of those two numbers.
# If no pair of numbers sums to zero, return `nil`.
*/

function twoSum(arr, target) {
  let sumMap = {};

  for (let i = 0; i < arr.length; i++) {
    if (!sumMap[arr[i]]) {
      let diff = target - arr[i];
      sumMap[diff] = i;
    } else {
      return [sumMap[arr[i]], i]
    }
  };

  return 0;
};

console.log(twoSum([1, 2, 6, 3, 5, 9], 11))
console.log(twoSum([1, 2, 5, 2], 8))
console.log(twoSum([6, 3, 5, 2, 1], 7))