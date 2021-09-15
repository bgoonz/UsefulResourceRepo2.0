/**
 * Created by Ashish Patel
 * Copyright © 2018 ashish.me
 * ashishsushilpatel@gmail.com
 */

/* You are given an integer N. You need to print the series of all prime numbers till N.

Input Format

The first and only line of the input contains a single integer N denoting the number till where you need to find the series of prime number.

Output Format

Print the desired output in single line separated by spaces.

Constraints

1<=N<=1000 */

const std_input = `9`;

function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function main(input) {
  let primeNumbersArray = [];
  for (let i = 2; i < parseInt(input); i++) {
    if (isPrime(i)) {
      primeNumbersArray.push(i);
    }
  }
  console.log(primeNumbersArray.join(" "));
}

main(std_input);
