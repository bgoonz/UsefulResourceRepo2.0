/**
 * Generates all permutations of an array, including duplicate
 * character sequences, like "aaa", "aab", and so on.
 */

const permutations = (array = []) => {
  let len = array.length;
  let results = [];

  const permute = (queue = []) => {
    if (queue.length === len) {
      results.push(queue);
    } else {
      for (let ele of array) {
        permute(queue.concat(ele));
      }
    }
  };

  permute();
  return results;
};

console.log(permutations(['a', 'b', 'c', 'd', 'e']).length); // 3125