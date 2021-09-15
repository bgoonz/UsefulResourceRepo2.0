/**
 *
 * Ashish Patel
 * e: ashishsushilPatel@gmail.com
 * w: https://ashish.me
 *
 */

const twoNumberSum = (nums, target) => {
  let map = {}
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (map[complement]) {
      return true
    } else {
      map[nums[i]] = nums[i]
    }
  }
  return false
}

console.log(twoNumberSum([3, 5, -4, 8, 11, 1, -1, 6], 10))
