/**
 *
 * Ashish Patel
 * e: ashishsushilPatel@gmail.com
 * w: https://ashish.me
 *
 */

// Write a function that returns the sum of all numbers regardless of # of params.

function add(...args) {
  return args.reduce((i, sum) => i + sum)
}

test('add', () => {
  expect(add([2, 3])).toEqual(5)
})
