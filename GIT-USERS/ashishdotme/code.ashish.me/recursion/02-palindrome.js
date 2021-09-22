/**
 *
 * Ashish Patel
 * e: ashishsushilPatel@gmail.com
 * w: https://ashish.me
 *
 */

function palindrome(string, start = 0, end = null) {
  if (end === null) {
    end = string.length - 1
  }
  if (string.length < 2) {
    return true
  }
  if (start >= end) {
    return true
  }
  if (string[start] !== string[end]) {
    return false
  } else {
    return palindrome(string, start + 1, end - 1)
  }
}

test('palindrome', () => {
  expect(palindrome('')).toEqual(true)
  expect(palindrome('Ashish')).toEqual(false)
  expect(palindrome('a')).toEqual(true)
  expect(palindrome('tt')).toEqual(true)
  expect(palindrome('tot')).toEqual(true)
  expect(palindrome('tacocat')).toEqual(true)
  expect(palindrome('boring')).toEqual(false)
})
