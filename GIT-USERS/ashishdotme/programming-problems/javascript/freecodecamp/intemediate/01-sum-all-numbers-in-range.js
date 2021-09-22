/**
 * Created by Ashish Patel
 * Copyright © 2017 ashish.me
 * ashishsushilpatel@gmail.com
 */

/**
 * Program:
 * We'll pass you an array of two numbers.
 * Return the sum of those two numbers and all numbers between them.
 * The lowest number will not always come first.
 */

function sumAll(arr) {
  var sum = 0;
  for (var i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sum += i;
  }
  return sum;
}

console.log(sumAll([1, 4]));
