/*
# Write a method that returns the `n`th prime number. Recall that only
# numbers greater than 1 can be prime.
*/

function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

function nthPrime(n) {
  let primes = [];
  let i = 1;
  while (primes.length <= n) {
    if (isPrime(i)) {
      primes.push(i)
    }
    i++
  };
  return primes[primes.length - 1];
};

console.log(nthPrime(1))
console.log(nthPrime(2))
console.log(nthPrime(3))
console.log(nthPrime(4))
console.log(nthPrime(5))