/*
# Write a method that takes in a string of lowercase letters and
# spaces, producing a new string that capitalizes the first letter of
# each word.
*/

function capitalize(str) {
  let words = str.split(" ");
  let res = [];

  for (let i = 0; i < words.length; i++) {
    res.push(words[i][0].toUpperCase() + words[i].slice(1))
  };

  return res.join(" ");
};

// console.log(capitalize("this is a sentence"))
// console.log(capitalize("lisa steele"))

function capMap(str) {
  let words = str.split(" ");
  return words.map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
};

console.log(capMap("this is a sentence"))
console.log(capMap("lisa steele"))