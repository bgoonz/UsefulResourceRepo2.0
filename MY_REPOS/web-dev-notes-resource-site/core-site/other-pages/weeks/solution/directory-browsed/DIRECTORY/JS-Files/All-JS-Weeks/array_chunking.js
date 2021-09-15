function arrayChunk(arr, n) {
  let res = [];
  for (let i = 0; i < arr.length; i += n) {
    res.push(arr.slice(i, i+n))
  }
  return res;
};

console.log(arrayChunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3))
console.log(arrayChunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 5))
console.log(arrayChunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 2))