/**
* question: http://www.programcreek.com/2014/08/leetcode-shortest-word-distance-java/
*
*/

function shortestWordDist(words, word1, word2) {
  let index1;
  let index2;

  return words.reduce((dist, word, index) => {
    if (word === word1) {
      index1 = index;
    }

    if (word === word2) {
      index2 = index;
    }

    if (index1 >= 0 && index2 >= 0) {
      dist = Math.min(Math.abs(index1 - index2), dist);
    }

    return dist;
  }, Number.MAX_VALUE);
}

// test cases
const words = ["practice", "makes", "perfect", "coding", "makes"];
const word1 = 'practice';
const word2 = 'coding';
const word3 = 'makes';
console.log(shortestWordDist(words, word1, word2));
console.log(shortestWordDist(words, word2, word3));
