/*
# Write a method that takes in a string and an array of indices in the
# string. Produce a new string, which contains letters from the input
# string in the order specified by the indices of the array of indices.
*/

function scrambleString(arr, str) {
  let res = '';
  for (let i = 0; i < arr.length; i++) {
    res += str[arr[i]]
  };
  return res;
};

console.log(scrambleString([3, 1, 2, 0], "abcd"))
console.log(scrambleString([5, 3, 1, 4, 2, 0], "markov"))