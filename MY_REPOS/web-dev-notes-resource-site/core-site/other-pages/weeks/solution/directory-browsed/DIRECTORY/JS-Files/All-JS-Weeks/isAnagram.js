// write a function that when given two strings, returns a boolean if they are anagrams or not
// anagrams are two words which contain the same letters but make up different words


function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  let letterMap = {};

  for (let i = 0; i < str1.length; i++) {
    let current = str1[i].toLowerCase()
    if (!letterMap[current]) {
      letterMap[current] = 1
    } else {
      letterMap[current] ++
    }
  }
  
  for (let j = 0; j < str2.length; j++) {
    let current = str2[j].toLowerCase();
    if (letterMap[current]) {
      letterMap[current] --
    } else {
      return false;
    }
  }
  return Object.values(letterMap).every(el => el === 0) ? true : false;
}

console.log(isAnagram("cool", "coolc"));
console.log(isAnagram("Listen", "silent"));
console.log(isAnagram("apple", "orange"));
console.log(isAnagram("elvis", "lives"));
console.log(isAnagram("california", "TOKYO"));
console.log(isAnagram("eleven plus two", "twelve plus one"));

