/**
 *
 * Ashish Patel
 * e: ashishsushilPatel@gmail.com
 * w: https://ashish.me
 *
 */

// Given an array of strings, return another array containing all of its longest strings.

// Example

// For inputArray = ["aba", "aa", "ad", "vcd", "aba"], the output should be allLongestStrings(inputArray) = ["aba", "vcd", "aba"].

function allLongestStrings(values) {
  let longestString = values[0].length
  values.forEach((str) => {
    if (str.length > longestString) {
      longestString = str.length
    }
  })
  return values.filter((str) => str.length === longestString)
}

test('all Longest Strings', () => {
  expect(allLongestStrings(['aba', 'aa', 'ad', 'vcd', 'aba'])).toEqual(['aba', 'vcd', 'aba'])
})
