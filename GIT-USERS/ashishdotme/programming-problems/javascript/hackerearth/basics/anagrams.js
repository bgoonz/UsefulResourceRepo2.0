/**
 * Created by Ashish Patel
 * Copyright © 2018 ashish.me
 * ashishsushilpatel@gmail.com
 */

/* Given two strings, a and b , that may or may not be of the same length, determine the minimum number of character deletions required to make a and b anagrams. Any characters can be deleted from either of the strings.

Input :

test cases,t
two strings a and b, for each test case
Output:

Desired O/p

Constraints :

string lengths<=10000 */

const std_input = `1
cde
abc`;

function main(input) {
  let inputArray = input.split("\n");
  console.log(inputArray);
  let charDict = {};
  for (let i = 1; i <= parseInt(inputArray[0]); i++) {
    let firstWord = inputArray[i].split("");
    let secondWord = inputArray[i + 1].split("");
    firstWord.forEach((value) => {
      charDict[value] = (charDict[value] || 0) + 1;
    });
    secondWord.forEach((value) => {
      charDict[value] = (charDict[value] || 0) - 1;
    });
    console.log(firstWord);
    console.log(secondWord);
    console.log(charDict);
    console.log(
      Object.keys(charDict).reduce((sum, key) => sum + charDict[key], 2)
    );
  }
}

main(std_input);
