/* https://leetcode.com/discuss/interview-question/542597/ */

function topKeywords(reviews, keywords, k) {
    keywords = keywords.map((w) => w.toLowerCase()); // case the keywords
  
    const reviewsFlattened = reviews
      .map((rev) => {
        return rev
          .toLowerCase() // case the review
          .split(" ") // split it into words
          .filter((w) => keywords.includes(w)); // filter keywords
      })
      .reduce((acc, cv) => {
        const encounteredWords = []; // keep track of encountered words to skip duplicates
        for (let i = 0; i < cv.length; i++) {
          if (acc[cv[i]]) acc[cv[i]]++; 
          if (!acc[cv[i]]) acc[cv[i]] = 1;
          encounteredWords.push(cv[i]);
        }
        return acc; // reduce the arrays of keywords from reviews into a map
      }, {});
  
    const resultsArray = Object.keys(reviewsFlattened) // build the results array from the property names/keywords
      .sort((a, b) => sortAlpha(reviewsFlattened, a, b)) // sort the keywords by occurrences then alphabetically
      .slice(0, k); // slice the array to kth index
  
    function sortAlpha(obj, a, b) {
      if (obj[b] - obj[a] < 0) return -1; 
      if (obj[b] - obj[a] > 0) return 1;
      if (obj[b] - obj[a] === 0) {
        return a.localeCompare(b); // if the keywords occur the same number of times, sort alphabetically
      }
    }
  
    return resultsArray;
  }
  const result = topKeywords(reviews, keywords, k);