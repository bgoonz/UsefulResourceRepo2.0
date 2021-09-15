const flatten = (arr) => {
  let index;
  while ((index = arr.findIndex((el) => Array.isArray(el))) > -1) {
    arr.splice(index, 1, ...arr[index]);
  }
  return arr;
};

flatten([1, [2, "a", { b: 1, c: [2, 3] }], [3, 4, [5, 6]]]);
console.log(
  "🚀 ~ file: flat.js ~ line 10 ~ flatten([1, [2, 'a', { b: 1, c: [2, 3] } ], [3, 4, [5, 6]]])",
  flatten([1, [2, "a", { b: 1, c: [2, 3] }], [3, 4, [5, 6]]])
);
// => [ 1, 2, 'a', { b: 1, c: [ 2, 3 ] }, 3, 4, 5, 6 ]
