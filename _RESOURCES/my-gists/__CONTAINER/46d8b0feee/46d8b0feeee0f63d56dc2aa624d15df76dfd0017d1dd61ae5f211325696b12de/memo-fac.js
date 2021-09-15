let memo = {}

function factorial(n) {
  // if this function has calculated factorial(n) previously,
  // fetch the stored result in memo
  if (n in memo) return memo[n];
  if (n === 1) return 1;

  // otherwise, it havs not calculated factorial(n) previously,
  // so calculate it now, but store the result in case it is
  // needed again in the future
  memo[n] = n * factorial(n - 1);
  return memo[n]
}

factorial(6);       // => 720, requires 6 calls
factorial(6);       // => 720, requires 1 call
factorial(5);       // => 120, requires 1 call
factorial(7);       // => 5040, requires 2 calls

memo;   // => { '2': 2, '3': 6, '4': 24, '5': 120, '6': 720, '7': 5040 }