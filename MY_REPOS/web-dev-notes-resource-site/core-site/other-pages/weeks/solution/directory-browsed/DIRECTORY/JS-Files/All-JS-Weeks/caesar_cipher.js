/*
# Write a method that takes in an integer `offset` and a string.
# Produce a new string, where each letter is shifted by `offset`. You
# may assume that the string contains only lowercase letters and
# spaces.
#
# When shifting "z" by three letters, wrap around to the front of the
# alphabet to produce the letter "c".
*/

function caesarCipher(str, offset) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let strArr = str.split("");
  let res = "";

  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === " ") {
      res += " ";
    } else {
      let currIdx = alphabet.indexOf(strArr[i]);
      let newIdx = (currIdx + offset) % 26;
      res += alphabet[newIdx]
    }
  };

  return res;
};

console.log(caesarCipher("abc", 3))
console.log(caesarCipher("abc xyz", 3))
