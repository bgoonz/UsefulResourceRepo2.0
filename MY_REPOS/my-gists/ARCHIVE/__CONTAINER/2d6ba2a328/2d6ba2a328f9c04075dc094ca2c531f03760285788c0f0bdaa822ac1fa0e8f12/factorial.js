function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(6);       // => 720, requires 6 calls
factorial(6);       // => 720, requires 6 calls
factorial(5);       // => 120, requires 5 calls
factorial(7);       // => 5040, requires 7 calls