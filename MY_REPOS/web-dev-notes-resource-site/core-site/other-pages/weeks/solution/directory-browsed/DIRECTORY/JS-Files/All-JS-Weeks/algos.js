//! To VIEW PROPERLY DOWNLOAD BETTER COMMENTS EXTENSION AND INSERT THE FOLLOWING TAGS IN PACKAGE.JSON:
/*
"better-comments.tags": [
    {
      "tag": "!",
      "color": "#FF0000",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": true,
      "italic": false
    },
    {
      "tag": "?",
      "color": "#0080FF",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "//",
      "color": "#00FF00",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": true,
      "italic": false
    },
    {
      "tag": "todo",
      "color": "#FF8C00",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "*",
      "color": "#9400D3",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": true,
      "italic": false
    },
    {
      "tag": "#",
      "color": "#B8860B",
      "strikethrough": false,
      "underline": true,
      "backgroundColor": "#F0FFFF",
      "bold": true,
      "italic": false
    },
    {
      "tag": "-",
      "color": "#FFFF00",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": true
    }
  ],
*/

//! In tabulation we create a table(array) and fill it with elements.
// We will complete the table by filling entries from first to last, or "left to right".
// -->This means that the first entry of the table(first element of the array) will correspond to the smallest subproblem.
// ---->The final entry of the table(last element of the array) will correspond to the largest problem !!(which is also the final answer.)!!
// There are two main features that comprise the Tabulation strategy:
// //1. the function is iterative and not recursive
//// 2. the additional data structure used is typically an array, commonly referred to as the table
// Example:
// Once again, we will use the fibonacci example for demonstration
function tabulatedFib(n) {
  // !create a blank array with n reserved spots
  let table = new Array(n);
  //console.log(table);
  //! initialize the first two values
  table[0] = 0;
  table[1] = 1;
  // complete the table by moving from left to right,

  for (let i = 2; i <= n; i += 1) {
    table[i] = table[i - 1] + table[i - 2];
    //console.log(table);
  }
  ////console.log(table);
  return table[n];
}
//console.log("tabulatedFib(6): ", tabulatedFib(6));
//console.log("tabulatedFib(7): ", tabulatedFib(7));
/*
bryan@LAPTOP-F699FFV1:/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week-7/days/tuesday/Past-Cohort/Useful$ node algos.js
[ <6 empty items> ]
[ 0, 1, 1, <3 empty items> ]
[ 0, 1, 1, 2, <2 empty items> ]
[ 0, 1, 1, 2, 3, <1 empty item> ]
[ 0, 1, 1, 2, 3, 5 ]
[0, 1, 1, 2, 3, 5, 8]
[ 0, 1, 1, 2, 3, 5, 8]
-tabulatedFib(6):  8
[ <7 empty items> ]
[ 0, 1, 1, <4 empty items> ]
[ 0, 1, 1, 2, <3 empty items> ]
[ 0, 1, 1, 2, 3, <2 empty items> ]
[ 0, 1, 1, 2, 3, 5, <1 empty item> ]
[0, 1, 1, 2,3, 5, 8]
[ 0, 1, 1,  2, 3, 5, 8, 13]
[ 0, 1, 1,  2, 3, 5, 8, 13]
-tabulatedFib(7):  13
*/
// console.log(tabulatedFib(7));      // => 13
// When we initialize the table and seed the first two values, it will look like this:
//   i	    | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
// ------------------------------------------
// table[i] | 0 | 1 |   |   |   |   |   |   |
// After the loop finishes, the final table will be:
//   i	   | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
// -----------------------------------------
// table[i]| 0 | 1 | 1 | 2 | 3 | 5 | 8 | 13|

//// Bonus:
//? ------------------HOW DOES THIS WORK--------------------------------
//! MOORE's LAWWWWWWWWWWWWWWWWW!!!!!!!!!!!
//! This is NOT tabulation, but an improvement on the code we just wrote.
//1, 2, 3, 5, (8), 13, 21
//fib(5)=8
//[0,1]

function SpaceSavingFib(n) {
  let mostRecentFibs = [0, 1];
  if (n === 0) return mostRecentFibs[0]; //0
  for (let i = 2; i <= n; i++) {
    // because values are alredy in table
    const [secondLast, last] = mostRecentFibs; //destructure
    mostRecentFibs = [last, secondLast + last]; //? how does this work?
  }
  return mostRecentFibs[1];
}
//console.log("SpaceSavingFib(6): ", SpaceSavingFib(6)); //-SpaceSavingFib(6):  8
//?  ------------------------------------END OF CONFUSION LOL --------------

//// Word break-------------------------------------------------------------
/*
The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). 
It returns the modified array.
Syntax
arr.fill(value[, start[, end]])
Parameters
!value
-Value to fill the array with. (Note all elements in the array will be this exact value.)
?start Optional
-Start index, default 0.
?end Optional
-End index, default arr.length.

!Return value
-The modified array, filled with value.

Description
If start is negative, it is treated as array.length + start.
If end is negative, it is treated as array.length + end.
fill is intentionally generic: it does not require that its this value be an Array object.
fill is a mutator method: it will change the array itself and return it, not a copy of it.
If the first parameter is an object, each slot in the array will reference that object.
*/
function wordBreak(string, dictionary) {
  //! "gooddog", ["good", "dog"]

  ////The fill() method changes all elements in an array to a static value ⬆️, from a start index (default 0) to an end index (default array.length).
  ////It returns the modified array.

  let table = new Array(string.length + 1).fill(false); //-[false, false, false, false, false, false, false, false];
  table[0] = true; //-[true, false, false, false, false, false, false, false];
  for (let i = 0; i < table.length; i++) {
    if (table[i] === false) continue; //-table[0] = true, table[4] = true
    //console.log(table); // [ true,  false, false, false, true,  false, false, true]
    for (let j = i + 1; j < table.length; j++) {
      //*Unique Pairs
      let word = string.slice(i, j); //testing every combination of subsets of the string
      if (dictionary.includes(word)) table[j] = true; //table[4], table[8] = true
      //console.log(table);
    }
  }
  return table[table.length - 1];
}
const dictionary = ["good", "dog"];
const string = "gooddog";
// wordBreak( string, dictionary );
// console.log( wordBreak( string, dictionary ) ); //!true

//------------------------Annagram----------------------------------------------------------------------------------------------------------------------------
/*
!Anagrams
Our goal today is to write a method that determines if two given words are anagrams(the letters in one word can be rearranged to form the other word).
For example:
-->anagram("gizmo", "sally")    # => false
-->anagram("elvis", "lives")    # => true
Assume that there is no whitespace or punctuation in the given strings.
Phase 4;
Write one more method fourth_anagram.This time, use two objects to store the
number of times each letter appears in both words.
Compare the resulting objects.
What is the time complexity ?
    Bonus : Do it with only one object.
Discuss the time complexity of your solutions together, then call over your TA to look at them.
*/
function anagrams(str1, str2) {
  if (str1.length !== str2.length) return false; // if the lengths of the strings differ they cannot possibly be anagrams

  let count = {};

  for (let i = 0; i < str1.length; i++) {
    //---------------------String1-----------------------------------------------------------
    if (count[str1[i]] === undefined) {
      // if the string does not exist in the object
      count[str1[i]] = 0; //initialize the string as a key (and value 0)
    }
    count[str1[i]] += 1; // increase the value for that key by 1
    //--------------------string2------------------------------------------------------------
    if (count[str2[i]] === undefined) {
      // if the second string does not exist in the object
      count[str2[i]] = 0; //initialize the string as a key (and value 0)
    }
    count[str2[i]] -= 1;
    console.log(count);
    //--------------End of Loop--------------------------------------------------------------
  }
  // console.log(count);
  return Object.values(count).every((num) => {
    return num === 0;
  });
}
const str1 = "asdfgh";
const str2 = "hgfdsa";
//console.log(anagrams(str1, str2));
/*
{ a: 1, h: -1 }
{ a: 1, h: -1, s: 1, g: -1 }
{ a: 1, h: -1, s: 1, g: -1, d: 1, f: -1 }
{ a: 1, h: -1, s: 1, g: -1, d: 0, f: 0 }
{ a: 1, h: -1, s: 0, g: 0, d: 0, f: 0 }
{ a: 0, h: 0, s: 0, g: 0, d: 0, f: 0 }
true
*/
const str3 = "asdfghh";
const str4 = "hgfdsaa";
//console.log(anagrams(str3, str4));
/*
{ a: 1, h: -1 }
{ a: 1, h: -1, s: 1, g: -1 }
{ a: 1, h: -1, s: 1, g: -1, d: 1, f: -1 }
{ a: 1, h: -1, s: 1, g: -1, d: 0, f: 0 }
{ a: 1, h: -1, s: 0, g: 0, d: 0, f: 0 }
{ a: 0, h: 0, s: 0, g: 0, d: 0, f: 0 }
{ a: -1, h: 1, s: 0, g: 0, d: 0, f: 0 }
false
*/

// //-----------Anagram Walkthrough----------Uncomment-----------------------------
// function anagrams(str1, str2) {
//   if (str1.length !== str2.length) return false; // if the lengths of the strings differ they cannot possibly be anagrams
//
//   let count = {};
//   /*
// const str1 = "asdfgh";
// const str2 = "hgfdsa";
// */
//   //! when i = 0
//   //*when i = 1
//   //// when i = 2
//   //?when i = 3
//
//   for (let i = 0; i < str1.length; i++) {
//     //---------------------String1-----------------------------------------------------------
//     if (count[str1[i]] === undefined) {
//       //! true
//       //*true
//       ////true
//       //? FALSE
//       // if the string does not exist in the object
//       count[str1[i]] = 0; //! count = {"a":0}
//       //*{ a: 1, h: -1, s: 0,}
//       ////{ a: 1, h: -1, s: 1, g: -1, d: 0}
//       //? DOES NOT HAPPEN
//     }
//     count[str1[i]] += 1; //! count = {"a":1}
//     //*{ a: 1, h: -1, s: 1,}
//     ////{ a: 1, h: -1, s: 1, g: -1, d: 1}
//     //?
//     //--------------------string2------------------------------------------------------------
//     if (count[str2[i]] === undefined) {
//       //! true
//       //*true
//       ////true
//       //? FALSE
//       // if the second string does not exist in the object
//       count[str2[i]] = 0; //! count = {"a":0, "h":0}
//       //*{ a: 1, h: -1, s: 1, g: 0 }
//       ////{ a: 1, h: -1, s: 1, g: -1, d: 1, f: 0 }
//       //? { a: 1, h: -1, s: 1, g: -1, d: 1, f: 0 }  <----- f= 0 ... (!!!the f in each word cancels out!!!)
//     }
//     count[str2[i]] -= 1; //! count = {"a":0, "h":-1}
//     //*{ a: 1, h: -1, s: 1, g: -1 }
//     ////{ a: 1, h: -1, s: 1, g: -1, d: 1, f: -1 }
//     //?
//     console.log(count); //# Same as count object directly above this log statment
//
//     //--------------End of Loop--------------------------------------------------------------
//   }
//   // console.log(count);
//   return Object.values(count).every((num) => {
//     return num === 0;
//   });
// }
// const str1 = "asdfgh";
// const str2 = "hgfdsa";
// console.log(anagrams(str1, str2));//!true
//
// const str3 = "asdfghh";
// const str4 = "hgfdsaa";
// console.log(anagrams(str3, str4));//!false

//****************************END OF ANAGRAM***************************************************** */

//!  ***************************************MEMOIZATION*******************************************/*
/*
Memoization is a design pattern used to reduce the overall number of calculations in algorithms that use recursive strategies.
//Memoization will store the results of the sub-problems in some other data structure.
There are two features that comprise memoization:
-1. the function is recursive
-2. the additional data structure used is typically an object(we refer to this as the memo!) (or cache!)
Example:
Our fibonacci fucntions have two recursive calls.
- time complexity of O(2^n)
*/
function slowFib(n) {
  if (n === 1 || n === 2) return 1;
  return slowFib(n - 1) + slowFib(n - 2);
}
//slowFib(6);
//console.log("slowFib(6): ", slowFib(6)); //- slowFib(6):  8
//---------------------------------------------------------------------------------------------------
//                                         f(6)
//                     f(5)                  |                  f(4)
//           f(4)        |         f(3)      |        f(3)       |     f(2)      |
//    f(3)     |  f(2)   |   f(2)   |  f(1)  |   f(2)  |   f(1)  |
// f(2) | f(1) |
// Many of the recursive function calls are being made multiple times
//---------------------------------------------------------------------------------------------------
//! If we store these results in an object,we can reduce the number of recursive calls the function will make.

function fastFib(n, memo = { 1: 1, 2: 1 }) {
  if (n in memo) return memo[n];
  // if (n === 1 || n === 2) return 1;
  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}
console.table([
  { "fastFib(4): ": fastFib(4) },
  { "fastFib(6): ": fastFib(6) },
  { "fastFib(50): ": fastFib(50) },
]);
/*
┌─────────┬──────────────┬──────────────┬───────────────┐
│ (index) │ fastFib(4):  │ fastFib(6):  │ fastFib(50):  │
├─────────┼──────────────┼──────────────┼───────────────┤
│    0    │      3       │              │               │
│    1    │              │      8       │               │
│    2    │              │              │  12586269025  │
└─────────┴──────────────┴──────────────┴───────────────┘
*/
/*
//fastFib(6); // => 8
//fastFib(50); // => 12586269025
Before memoization
                                        f(6)
                    f(5)                  |                  f(4)
          f(4)        |         f(3)      |        f(3)       |     f(2)      |
   f(3)     |  f(2)   |   f(2)   |  f(1)  |   f(2)  |   f(1)  |
f(2) | f(1) |
---------------------------------------------------------------------------------
Now, our function calls will look like this:
                                        f(6)
                    f(5)                  |           f(4) <= retrieve stored answer
          f(4)        |         f(3)   <= retrieve stored answer
   f(3)     |  f(2)   |
f(2) | f(1) |
-In slowFib, the number of procedures is about 2^n, giving a time complexity of O(2^n)
-In fastFib, the number of procedures is 1+2(n-2) = 2n-3, giving a time complexity of O(n)
*/
