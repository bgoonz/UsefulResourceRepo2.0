/*
# Write a method that takes a string in and returns true if the letter
# "z" appears within three letters **after** an "a". You may assume
# that the string contains only lowercase letters.
*/

function nearbyAZ(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "a") {
      let subStr = str.slice(i, i + 4);
      if (subStr.includes("z")) {
        return true;
      }
    }
  };
  return false;
};

console.log(nearbyAZ("baz"))
console.log(nearbyAZ("a"))
console.log(nearbyAZ("z"))
console.log(nearbyAZ("californiaz"))
console.log(nearbyAZ("atestingz"))