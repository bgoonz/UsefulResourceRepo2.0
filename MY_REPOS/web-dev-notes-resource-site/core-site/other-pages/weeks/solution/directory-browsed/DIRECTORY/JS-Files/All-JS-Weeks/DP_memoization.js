/*
Strategy for Memoization:
1. Write the unoptimized, brute force recursion
2. Add the memo object as an additional argument to the function
3. Add a base case which returns the stored value if the function's argument is in the memo
4. Before you return the result of the recursive case, store it in the memo
*/

// note that you must pass in memo each time you make the recursive call, or else you won't get the speed
// this doesn't seem to be the case for factorial, but it is necessary for memoizing the Fibonacci

// factorial
function factorialRecursive(n) {
  if (n <= 1) return n;

  return n * factorialRecursive(n - 1);
}

function factorialMemo(n, memo={}) {
  if (memo[n]) return memo[n];
  if (n === 1) return 1;

  memo[n] = n * factorialMemo(n - 1, memo)
  return memo[n]
}

// recursive Fib
function fibRecursive(n) {
  if (n === 1) return 0;
  if (n === 2) return 1;

  return fibRecursive(n - 1) + fibRecursive(n - 2)
}


// memoize Fib
function fibMemo(n, memo={}) {
  if (memo[n]) return memo[n];
  if (n === 1) return 0;
  if (n === 2) return 1;

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n]
}

