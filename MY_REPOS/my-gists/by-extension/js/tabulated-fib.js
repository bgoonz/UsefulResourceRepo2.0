
// Using tabulation
// Time Complexity: O(n)
//   - We are iterating through an array directly related to the size of the input and performing a constant number of calculations at each step (adding our two previous values together and storing the result in the array).
function fib(n) {
  // We create a table to track our values as we build them up
  // We're making it n+1 here so that table[n] lines up with the nth fib number
  // This is because arrays are zero-indexed.
  // We could have used an array of length n, but we would have to remember that
  // the nth fib number would then be stored at table[n-1]. Completely doable,
  // but I think making them line up is more intuitive.
  let table = new Array(n + 1);
  // Seed our table with our starting values.
  // Again, if we had a table of length n, we could have seeded table[0] = 1
  // and table[1] = 1 and had the same final result with our indices shifted.
  table[0] = 0;
  table[1] = 1;
  // Iterate through our input and fill out our table as we go.
  for (let i = 2; i < table.length; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  // At the end, the final entry in our table is the result we are looking for.
  // The table holds all of the sub-answers that we used to get to this result.
  return table[n];
}
