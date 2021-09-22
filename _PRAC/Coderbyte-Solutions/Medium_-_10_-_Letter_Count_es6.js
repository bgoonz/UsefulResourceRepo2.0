function LetterCount(str) {
  const wordArr = str.split(" ");
  let currentDif = 0;
  let largestDif = 0;
  let answer;
  let currentWord;
  let currentWordLength;
  let currentWordR;
  let currentWordRLength;

  for (i = 0; i < wordArr.length; i++) {
    currentWord = wordArr[i].split("").sort();
    currentWordLength = currentWord.length;
    for (j = 0; j < currentWordLength - 1; j++) {
      if (currentWord[j] === currentWord[j + 1]) {
        currentWord.splice(j, 1);
      }
    }
    currentWordR = currentWord;
    currentWordRLength = currentWordR.length;
    currentDif = currentWordLength - currentWordRLength;

    if (currentDif > largestDif) {
      largestDif = currentDif;
      answer = wordArr[i];
    }
  }
  if (largestDif > 0) {
    return answer;
  } else {
    return -1;
  }
}
