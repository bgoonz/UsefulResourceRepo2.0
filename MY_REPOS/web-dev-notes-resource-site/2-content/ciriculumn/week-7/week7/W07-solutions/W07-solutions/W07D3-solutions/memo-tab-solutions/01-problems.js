/*********************************************************************
Write a function, lucasNumberMemo(n), that takes in a number.
The function should return the n-th number of the Lucas Sequence.
The 0-th number of the Lucas Sequence is 2.
The 1-st number of the Lucas Sequence is 1
To generate the next number of the sequence, we add up the previous two
numbers.

For example, the sequence begins: 2, 1, 3, 4, 7, 11, ...

Solve this recursively with memoization.

Examples:

lucasNumberMemo(0)   // => 2
lucasNumberMemo(1)   // => 1
lucasNumberMemo(40)  // => 228826127
lucasNumberMemo(41)  // => 370248451
lucasNumberMemo(42)  // => 599074578
*********************************************************************/

function lucasNumberMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 0) return 2;
  if (n === 1) return 1;
  memo[n] = lucasNumberMemo(n - 1, memo) + lucasNumberMemo(n - 2, memo);
  return memo[n];
}

/*********************************************************************
Write a function, stepper(nums), that takes in an array of non negative
numbers.

Each element of the array represents the maximum number of steps you can take
from that position in the array.

The function should return a boolean indicating if it is possible to travel
from the first position of the array to the last position.

For Example:

Given [3, 1, 0, 5, 10]
  - We begin at first position, 3. 
  - Since the element is 3 we can take up to 3 steps from this position.
  - This means we can step to the 1, 0, or 5
  - Say we step to 1
  - Since the element is 1, now the only option is to take 1 step to land on 0
  - etc...

Solve this problem with tabulation.
Once you're done, come back and try to solve it with memoization.

Examples:

stepper([3, 1, 0, 5, 10]);           // => true, because we can step through elements 3 -> 5 -> 10
stepper([3, 4, 1, 0, 10]);           // => true, because we can step through elements 3 -> 4 -> 10
stepper([2, 3, 1, 1, 0, 4, 7, 8])    // => false, there is no way to step to the end
*********************************************************************/

function stepper(nums) {
  let table = new Array(nums.length).fill(false);
  table[0] = true;

  for (let i = 0; i < table.length; i++) {
    if (table[i] === true) {
      let range = nums[i];
      for (let step = 1; step <= range; step++) {
        table[i + step] = true;
      }
    }
  }

  return table[table.length - 1];
}

/*********************************************************************
Write a function, maxNonAdjacentSum(nums), that takes in an array of nonnegative
numbers.
The function should return the maximum sum of elements in the array we can get
if we cannot take adjacent elements into the sum.

Solve this problem with tabulation.
Once you're done, come back and try to solve it with memoization.

Examples:

maxNonAdjacentSum([2, 7, 9, 3, 4])   // => 15, because 2 + 9 + 4
maxNonAdjacentSum([4,2,1,6])         // => 10, because 4 + 6
*********************************************************************/

function maxNonAdjacentSum(nums) {
  let table = new Array(nums.length).fill(0);
  table[0] = nums[0];
  table[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < table.length; i++) {
    table[i] = Math.max((nums[i] + nums[i - 2]), nums[i - 1]);
  }
  
  return table[nums.length - 1];
}

module.exports = {
  lucasNumberMemo,
  stepper,
  maxNonAdjacentSum,
};
