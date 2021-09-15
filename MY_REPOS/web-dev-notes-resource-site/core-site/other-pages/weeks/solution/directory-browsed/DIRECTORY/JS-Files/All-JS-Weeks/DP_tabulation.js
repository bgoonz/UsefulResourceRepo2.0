/*
Strategy for Tabulation:
1. Create a table (array) based off the size of the input.
2. Initialize some values in the table that 'answer' the trivially small sub-problem
3. Iterate through the array and fill in the remaining entries
4. Final answer is the last entry in the table
*/

// find the nth fib
function fibsRecursive(n) {
  if (n === 1) return 0;
  if (n === 2) return 1;

  return fibsRecursive(n - 1) + fibsRecursive(n - 2);
}

// this is also the iterative solution, because Tabulation requires an iterative solution
function fibsTabulation(n) {
  if (n === 1) return 0;
  if (n === 2) return 1;

  let fibs = [0, 1];
  for (let i = 2; i < n; i++) {
    fibs.push(fibs[i - 1] + fibs[i - 2])
  }

  return fibs[n - 1];
}


