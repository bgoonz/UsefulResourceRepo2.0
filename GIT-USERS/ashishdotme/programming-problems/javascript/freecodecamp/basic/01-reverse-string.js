/**
 * Created by Ashish Patel
 * Copyright © 2017 ashish.me
 * ashishsushilpatel@gmail.com
 */

/**
 * Problem:
 * Reverse the provided string
 * You may need to turn the string into an array before you can reverse it
 * Your result must be string
 */

function reverseString(str) {
  return str.split("").reverse().join("");
}

console.log(reverseString("Ashish"));
