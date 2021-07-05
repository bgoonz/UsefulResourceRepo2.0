function PrimeMover(num) {
  const isPrime = (num) => {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };

  const primeArr = [];
  let cur = 2;

  while (primeArr.length < num) {
    if (isPrime(cur)) {
      primeArr.push(cur);
    }
    cur++;
  }
  return primeArr.pop();
}
