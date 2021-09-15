/*
# Write a method that takes in a string. Your method should return the
# most common letter in the array, and a count of how many times it
# appears.
*/

function mostCommonLetter(str) {
  let charMap = {};
  for (let i = 0; i < str.length; i++) {
    if (!charMap[str[i]]) {
      charMap[str[i]] = 1;
    } else {
      charMap[str[i]] += 1;
    }
  };
  let highestCount = Object.values(charMap).sort((a, b) => b - a)[0]
  let mostCommon = Object.keys(charMap).find(key => charMap[key] === highestCount)
  return [mostCommon, highestCount]
};

console.log(mostCommonLetter("abca"))
console.log(mostCommonLetter("abbab"))