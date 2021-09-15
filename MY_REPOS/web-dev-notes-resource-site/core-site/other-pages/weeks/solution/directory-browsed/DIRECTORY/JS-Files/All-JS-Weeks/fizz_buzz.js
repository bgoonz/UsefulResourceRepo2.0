// given a number as input, return all numbers up to and including that number
// if a number is divisible by 3, replace with 'fizz', and if it's divisible by 5,
//  replace with 'buzz'
// if it's divisible by 3 and 5, replace with 'fizzbuzz'

function fizzbuzz(n) {
  let res = [];
  let num = 1;

  while (num <= n) {
    if (num % 3 === 0 && num % 5 === 0) {
      res.push('fizzbuzz');
    } else if (num % 3 === 0) {
      res.push('fizz');
    } else if (num % 5 === 0) {
      res.push('buzz');
    } else {
      res.push(num)
    }
    num++
  }
  return res.join("");
};

console.log(fizzbuzz(20))