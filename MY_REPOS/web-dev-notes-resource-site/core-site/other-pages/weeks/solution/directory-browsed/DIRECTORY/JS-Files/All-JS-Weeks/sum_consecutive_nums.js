/*
You are given a list / array which contains only integers (positive and negative).
Your job is to sum only the numbers that are the same and consecutive.
The result should be one list.

You can asume there is never an empty list / array 
and there will always be an integer.
*/

// You want to keep track of numbers in case they are repeated
// if they stop being repeated, push it into the array
// if they are repeated, push nothing and continue.

// the key is that you can do this all at once, without creating a
// separate stack to store duplicates.
// if you add an element to the sum no matter what, then 
// when it stops being repeated, you can just push the sum and it's the same thing.
// if it is repeated, then you've already started summing so no need for an additional stack.

function sumConsecutives(s) {
  let res = [];
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    sum += s[i]
    if (s[i] !== s[i + 1]) {
      res.push(sum)
      sum = 0;
    }
  }
  return res
}

console.log(sumConsecutives([1, 1, 7, 7, 3]))