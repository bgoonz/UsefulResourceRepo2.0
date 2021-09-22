const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a sentence to be censored: ', (sentence) => {
  rl.question('Enter a path to a dictionary: ', (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      const dictionary = data.split('\n');
      console.log(censorSentence(sentence, dictionary));
      rl.close();
    });
  });
});

function censorSentence(sentence, dictionary) {
  const words = sentence.split(' ');
  const newWords = words.map((word) => {
    if (dictionary.includes(word)) {
      return starVowels(word);
    } else {
      return word;
    }
  });
  return newWords.join(' ');
}

function starVowels(word) {
  const vowels = 'aeiouAEIOU';
  let newWord = '';
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    if (vowels.includes(char)) {
      newWord += '*';
    } else {
      newWord += char;
    }
  }
  return newWord; 
}
