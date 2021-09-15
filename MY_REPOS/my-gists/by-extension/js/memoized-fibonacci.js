

// Standard Implementation
// Time Complexity: O(2^n)
//   - For each call to fib, we have to make two branches, with n levels to this tree
function fib( n ) {
  if ( n === 1 || n === 2 ) return 1;
  return fib( n - 1 ) + fib( n - 2 ); // fib(3) + fib(2)
}
//fib(2) + fib(1)
// Using memoization
// Time Complexity: O(n)
//   - We only ever have to calculate fib(x) one time, every other time that we use it in a larger problem, the result is immediately accessible in our memo
//   - The memo removes the repeated trees of calculations from our original code
function fib( n, memo = {} ) { // n = 4, memo = { 3: 2, 4: 3 }
  if ( n in memo ) return memo[ n ]; // If we already calculated this value, return it
  if ( n === 1 || n === 2 ) return 1;
  // Store the result in the memo first before returning
  // Make sure to pass the memo in to your calls to fib!
  memo[ n ] = fib( n - 1, memo ) + fib( n - 2, memo );
  return memo[ n ];
}
// memo[5] = fib(4) + fib(3) = 3 + memo[3] = 5
// memo[4] = fib(3) + fib(2) = 2 + 1 = 3
// memo[3] = fib(2) + fib(1) = 1 + 1 = 2
