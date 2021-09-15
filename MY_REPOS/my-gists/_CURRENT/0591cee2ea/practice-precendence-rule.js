/*
we create 2 separate arrays of letters and count 
the number of characters resulting from the 
original precedence array.

we look up the index of each letter from first letter
array and follow the index of the next letter.
*/
function findWord(a) {
  console.log(a);
  let split = [];
  let len = a.length;
  let original = a;

  let firstLetter = [],
    secondLetter = [],
    currentIndex = 0,
    count = {},
    letter;

  //count the number of repetitions for each letter
  while (currentIndex < len) {
    firstLetter.push(a[currentIndex].charAt(0));
    secondLetter.push(a[currentIndex].charAt(2));

    recordLetter(count, a[currentIndex].charAt(0), a[currentIndex].charAt(2));
    //console.log(count);
    currentIndex++;
  }

  //console.log(firstLetter, secondLetter, count);

  //The first letter should be in firstLetter array
  //and has count of 1.
  let first;
  for (let c in count) {
    if (count[c] === 1) {
      if (firstLetter.indexOf(c) >= 0) first = c;
    }
  }

  let result = first;
  currentIndex = firstLetter.indexOf(first);
  let times = 0;
  while (times < len) {
    result += secondLetter[currentIndex];
    currentIndex = firstLetter.indexOf(secondLetter[currentIndex]);

    times++;
  }

  console.log(result);
  return result;
}

function recordLetter(count, letter1, letter2) {
  count[letter1] = count[letter1] ? count[letter1] + 1 : 1;
  count[letter2] = count[letter2] ? count[letter2] + 1 : 1;

  return count;
}

findWord(["P>E", "E>R", "R>U"]); // PERU
findWord(["I>N", "A>I", "P>A", "S>P"]); // SPAIN
findWord(["U>N", "G>A", "R>Y", "H>U", "N>G", "A>R"]); // HUNGARY
findWord(["I>F", "W>I", "S>W", "F>T"]); // SWIFT
findWord(["R>T", "A>L", "P>O", "O>R", "G>A", "T>U", "U>G"]); // PORTUGAL
findWord(["U>N", "G>A", "R>Y", "H>U", "N>G", "A>R"]); // HUNGARY
findWord(["I>F", "W>I", "S>W", "F>T"]); // SWIFT
findWord(["R>T", "A>L", "P>O", "O>R", "G>A", "T>U", "U>G"]); // PORTUGAL
findWord([
  "W>I",
  "R>L",
  "T>Z",
  "Z>E",
  "S>W",
  "E>R",
  "L>A",
  "A>N",
  "N>D",
  "I>T",
]); // SWITZERLAND
