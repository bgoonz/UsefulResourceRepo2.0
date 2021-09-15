/**
 * Created by Ashish Patel
 * Copyright © 2017 ashish.me
 * ashishsushilpatel@gmail.com
 */

/**
 * Remove all falsy values from an array.
 * Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.
 */

function bouncer(arr) {
  return arr.filter((item) => {
    return Boolean(item)
  })
}

console.log(bouncer([7, 'ate', '', false, 9]))
