const isPrime = (n) => {
  if (n < 3) return false;
  if (n % 2 === 0) return false;
  if (n % 3 === 0) return false;
  let limit = Math.sqrt(n);
  for (let i = 5; i <= limit; i += 6) {
    if (num % i === 0) return false;
    if (num % (i + 2) === 0) return false;
  }

  return true;
};
