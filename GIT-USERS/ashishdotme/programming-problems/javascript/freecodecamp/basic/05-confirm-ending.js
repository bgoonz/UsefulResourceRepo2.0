/**
 * Created by Ashish Patel
 * Copyright © 2017 ashish.me
 * ashishsushilpatel@gmail.com
 */

/**
 * Program:
 * Check if a string (first argument, str) ends with the given target string (second argument, target).
 */

function confirmEnding(str, term) {
  return str.substring(str.length - term.length, str.length) === term;
}

console.log(confirmEnding("Beautiful", "l"));
