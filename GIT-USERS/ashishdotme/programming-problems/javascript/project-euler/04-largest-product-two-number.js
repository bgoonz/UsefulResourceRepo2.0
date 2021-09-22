function reverse(digit) {
  reverse = 0;
  while (digit > 0) {
    remainder = digit % 10;
    reverse = reverse * 10 + remainder;
    digit = Math.floor(digit / 10);
  }
  return reverse;
}

function largestPalindromeProduct(digit) {
  let largest = 0;
  let floor = 100;
  let ceiling = 999;
  for (let i = ceiling - 1; i > floor; i--) {
    for (let j = ceiling; j > floor; j--) {
      let product = i * j;
      if (product === reverse(product)) {
        if (product > largest) {
          largest = product;
        }
      }
    }
  }
  return largest;
}

let result = largestPalindromeProduct(123);
console.log(result);
