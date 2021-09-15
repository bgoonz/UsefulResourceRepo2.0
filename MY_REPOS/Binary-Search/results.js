const { recurBSearch, iterBSearch, recurBSearchIdx, recurBSearchIdxV2, iterBSearchIdx } = require('./bsearch');
/*------------------ DONT TOUCH THE CODE ABOVE THIS LINE ------------------*/

/*******************************************************************
Use the following test cases to check your work (note: there are no Mocha Specs
for today's project)

Run these tests by `cd`ing into this directory and typing `node results.js`
into your terminal.
*******************************************************************/

const oddNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const evenNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function logResults(actual, expected) {
  console.log(`Expected: ${expected}   Your Result: ${actual}`);
}

// TEST CASES FOR BINARY SEARCH VERSION 1: Recursive Binary Search that returns
// a Boolean Value indicating if targetNum is within the nums array.
// TESTS WITH ODD NUMBER OF ELEMENTS
console.log("PROBLEM 1 RESULTS:")
console.log("ODD NUMBER OF ELEMENTS")
logResults(recurBSearch(oddNums, 0), false);
logResults(recurBSearch(oddNums, 2), true);
logResults(recurBSearch(oddNums, 5), true);
logResults(recurBSearch(oddNums, 7), true);
logResults(recurBSearch(oddNums, 10), false);
// TESTS WITH EVEN NUMBER OF ELEMENTS
console.log("EN NUMBER OF ELEMENTS")
logResults(recurBSearch(evenNums, 0), false);
logResults(recurBSearch(evenNums, 2), true);
logResults(recurBSearch(evenNums, 5), true);
logResults(recurBSearch(evenNums, 7), true);
logResults(recurBSearch(evenNums, 10), true);
console.log("  ")
console.log("  ")


// TEST CASES FOR BINARY SEARCH VERSION 2: Iterative Binary Search that returns
// a Boolean Value indicating if targetNum is within the nums array.
// TESTS WITH ODD NUMBER OF ELEMENTS
console.log("PROBLEM 2 RESULTS:")
console.log("ODD NUMBER OF ELEMENTS")
logResults(iterBSearch(oddNums, 0), false);
logResults(iterBSearch(oddNums, 2), true);
logResults(iterBSearch(oddNums, 5), true);
logResults(iterBSearch(oddNums, 7), true);
logResults(iterBSearch(oddNums, 10), false);
// TESTS WITH EVEN NUMBER OF ELEMENTS
console.log("EN NUMBER OF ELEMENTS")
logResults(iterBSearch(evenNums, 0), false);
logResults(iterBSearch(evenNums, 2), true);
logResults(iterBSearch(evenNums, 5), true);
logResults(iterBSearch(evenNums, 7), true);
logResults(iterBSearch(evenNums, 10), true);
console.log("  ")
console.log("  ")


// TEST CASES FOR BINARY SEARCH VERSION 3: Recursive Binary Search that returns
// the Index Value of the targetNum if it is in the nums array, and -1 if it is
// not found.
// TESTS WITH ODD NUMBER OF ELEMENTS
console.log("PROBLEM 3 RESULTS:")
console.log("ODD NUMBER OF ELEMENTS")
logResults(recurBSearchIdx(oddNums, 0), -1);
logResults(recurBSearchIdx(oddNums, 2), 1);
logResults(recurBSearchIdx(oddNums, 5), 4);
logResults(recurBSearchIdx(oddNums, 7), 5);
logResults(recurBSearchIdx(oddNums, 10), -1);
// TESTS WITH EVEN NUMBER OF ELEMENTS
console.log("EN NUMBER OF ELEMENTS")
logResults(recurBSearchIdx(evenNums, 0), -1);
logResults(recurBSearchIdx(evenNums, 2), 1);
logResults(recurBSearchIdx(evenNums, 5), 4);
logResults(recurBSearchIdx(evenNums, 7), 6);
logResults(recurBSearchIdx(evenNums, 10), 9);
console.log("  ")
console.log("  ")

// TEST CASES FOR BINARY SEARCH VERSION 4: Second Version of Recursive Binary
// Search that returns the Index Value of the targetNum if it is in the nums
// array, and -1 if it is not found.
// TESTS WITH ODD NUMBER OF ELEMENTS
console.log("PROBLEM 4 RESULTS:")
console.log("ODD NUMBER OF ELEMENTS")
logResults(recurBSearchIdxV2(oddNums, 0), -1);
logResults(recurBSearchIdxV2(oddNums, 2), 1);
logResults(recurBSearchIdxV2(oddNums, 5), 4);
logResults(recurBSearchIdxV2(oddNums, 7), 6);
logResults(recurBSearchIdxV2(oddNums, 10), -1);
// TESTS WITH EVEN NUMBER OF ELEMENTS
console.log("EVEN NUMBER OF ELEMENTS")
logResults(recurBSearchIdxV2(evenNums, 0), -1);
logResults(recurBSearchIdxV2(evenNums, 2), 1);
logResults(recurBSearchIdxV2(evenNums, 5), 4);
logResults(recurBSearchIdxV2(evenNums, 7), 6);
logResults(recurBSearchIdxV2(evenNums, 10), 9);
console.log("  ")
console.log("  ")


// TEST CASES FOR BINARY SEARCH VERSION 5: Iterative Binary Search that returns
// the Index Value of the targetNum if it is in the nums array, and -1 if it is
// not found.
// TESTS WITH ODD NUMBER OF ELEMENTS
console.log("PROBLEM 5 RESULTS:")
console.log("ODD NUMBER OF ELEMENTS")
logResults(iterBSearchIdx(oddNums, 0), -1);
logResults(iterBSearchIdx(oddNums, 2), 1);
logResults(iterBSearchIdx(oddNums, 5), 4);
logResults(iterBSearchIdx(oddNums, 7), 6);
logResults(iterBSearchIdx(oddNums, 10), -1);
// TESTS WITH EVEN NUMBER OF ELEMENTS
console.log("EVEN NUMBER OF ELEMENTS")
logResults(iterBSearchIdx(evenNums, 0), -1);
logResults(iterBSearchIdx(evenNums, 2), 1);
logResults(iterBSearchIdx(evenNums, 5), 4);
logResults(iterBSearchIdx(evenNums, 7), 6);
logResults(iterBSearchIdx(evenNums, 10), 9);
