/*
# Write a method that takes in a number and returns a string, placing
# a single dash before and after each odd digit. There is one
# exception: don't start or end the string with a dash.
*/

function dasherize(num) {
  let numAsString = num.toString().split("");
  let res = '';
  let idx = 0;
  while (idx < numAsString.length) {
    if (idx > 0) {
      if (numAsString[idx - 1] % 2 !== 0 || numAsString[idx] % 2 !== 0) {
        res += "-"
      }
    } 
    res += numAsString[idx];
    idx++
  }
  return res;
};

console.log(dasherize(203))
console.log(dasherize(303))
console.log(dasherize(333))