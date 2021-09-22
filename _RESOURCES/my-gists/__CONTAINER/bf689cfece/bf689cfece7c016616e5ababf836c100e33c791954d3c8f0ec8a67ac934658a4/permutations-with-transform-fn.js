/**
 * This variant takes a transform function to modify each set
 * before it's pushed onto the results array
 */

const identity = ele => ele;
const permutations = (arr, max = arr.length, fn = identity) => {
  if (typeof max === 'function') return permutations(arr, arr.length, max);

  let depth = Math.min(max, arr.length);
  let results = [];

  const permute = (queue = []) => {
    if (queue.length === depth) {
      results.push(fn(queue));
    } else {
      for (let ele of arr) {
        permute(queue.concat(ele));
      }
    }
  };

  permute();
  return results;
};

console.log(permutations(['a', 'b', 'c'], 2, ele => ele.join('.')));
