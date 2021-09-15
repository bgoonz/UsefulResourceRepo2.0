/**
 * This variant takes a max depth as the second argument.
 */

const permutations = (value, max = value.length) => {
  let depth = Math.min(max, value.length);
  let results = [];

  const permute = (queue = []) => {
    if (queue.length === depth) {
      results.push(queue);
    } else {
      for (let ele of value) {
        permute(queue.concat(ele));
      }
    }
  };

  permute();
  return results;
};

console.log(permutations(['a', 'b', 'c', 'd', 'e']).length); // 3125
console.log(permutations(['a', 'b', 'c', 'd', 'e'], 4).length); // 625
console.log(permutations(['a', 'b', 'c', 'd', 'e'], 3).length); // 125
console.log(permutations(['a', 'b', 'c', 'd', 'e'], 2).length); // 25
console.log(permutations(['a', 'b', 'c', 'd', 'e'], 1).length); // 5
