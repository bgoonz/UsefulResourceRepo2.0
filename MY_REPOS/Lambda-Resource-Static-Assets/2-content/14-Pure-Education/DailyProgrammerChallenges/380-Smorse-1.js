/*
# Smooshed Morse Code 1

## Description

For the purpose of this challenge, Morse code represents every letter as a sequence of 1-4 characters, each of which is either . (dot) or - (dash). The code for the letter a is .-, for b is -..., etc. The codes for each letter a through z are:

```
.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --..
```

Normally, you would indicate where one letter ends and the next begins, for instance with a space between the letters' codes, but for this challenge, just smoosh all the coded letters together into a single string consisting of only dashes and dots.

*/

const assert = require("assert");

const morseAlphabet = ".- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --..".split(
  " "
);
const engAlphabet = "abcdefghijklmnopqrstuvwxyz".split("");

// Map the morse alphabet to the english alphabet, so that the
// structure looks like: { a: ".-", ... }
const alphabet = Object.assign(
  ...engAlphabet.map((k, i) => ({ [k]: morseAlphabet[i] }))
);

// mildly code-golphed function for converting an english word
// into smorse code.
const smorse = code =>
  code
    .split("")
    .map(a => alphabet[a])
    .join("");

assert.equal(smorse("sos"), "...---...");
assert.equal(smorse("daily"), "-...-...-..-.--");
assert.equal(smorse("programmer"), ".--..-.-----..-..-----..-.");
assert.equal(smorse("bits"), "-.....-...");
assert.equal(smorse("three"), "-.....-...");
