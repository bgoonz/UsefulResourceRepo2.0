function countVowels(str) {
  let vowels = 'aeiou';
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) count++
  };
  return count;
};

console.log(countVowels("california"))
console.log(countVowels("apple"))
console.log(countVowels("hello world"))