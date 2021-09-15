/*
Given a magazine of words and a ransom note, 
determine if it's possible to "cut out" and create the ransom note from the magazine words.
*each word has to exist in the magazine in it's entirety, not just letters
*/

const magazine =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

function ransomNote(note, magazine) {
  let magHash = {};
  let magWords = magazine.split(" ");
  for (let i = 0; i < magWords.length; i++) {
    if (!magHash[magWords[i]]) {
      magHash[magWords[i]] = 1
    } else {
      magHash[magWords[i]] += 1
    }
  };

  let noteWords = note.split(" ");
  for (let i = 0; i < noteWords.length; i++) {
    if (magHash[noteWords[i]]) {
      magHash[noteWords[i]] -= 1;
      if (magHash[noteWords[i]] < 0) {
        return false;
      }
    } else {
      return false;
    }
  };
  return true;
};

console.log(ransomNote("sit ad est sint", magazine))
console.log(ransomNote("sit ad est love", magazine))
console.log(ransomNote("sit ad est sint in in", magazine))
console.log(ransomNote("sit ad est sint in in in in", magazine))
