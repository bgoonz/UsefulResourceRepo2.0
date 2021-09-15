function fastFib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 1 || n === 2) return 1;

  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}

fastFib(6);     // => 8
fastFib(50);    // => 12586269025