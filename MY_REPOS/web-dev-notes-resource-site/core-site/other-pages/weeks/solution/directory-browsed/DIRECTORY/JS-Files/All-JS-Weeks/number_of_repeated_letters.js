/*
# Write a method that takes in a string and returns the number of
# letters that appear more than once in the string. You may assume
# the string contains only lowercase letters. Count the number of
# letters that repeat, not the number of times they repeat in the
# string.
*/

function numRepeats(str) {
  let strArr = str.split("");
  let charMap = {};
  for (let i = 0; i < strArr.length; i++) {
    if (!charMap[strArr[i]]) {
      charMap[strArr[i]] = 1;
    } else {
      charMap[strArr[i]] += 1;
    }
  };

  let repeats = Object.values(charMap).filter(count => count > 1);
  return repeats.length;
};

console.log(numRepeats("abdbc"))
console.log(numRepeats("aaa"))
console.log(numRepeats("abab"))
console.log(numRepeats("cadac"))
console.log(numRepeats("abcde"))