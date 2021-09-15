/**
 *
 * Ashish Patel
 * e: ashishsushilPatel@gmail.com
 * w: https://ashish.me
 *
 */

const maximumSubArray = (arr) => {
  let currentSum = 0;
  let maxSum = 0;
  let allNumbersNegative = true;
  let miniumNegative = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    currentSum = currentSum + arr[i];
    if (currentSum < 0) {
      currentSum = 0;
    }
    maxSum = Math.max(maxSum, currentSum);
    if (arr[i] < 0) {
      if (arr[i] > miniumNegative) {
        miniumNegative = arr[i];
      }
    } else {
      allNumbersNegative = false;
    }
  }
  return allNumbersNegative ? miniumNegative : maxSum;
};

console.log(maximumSubArray([-2, -3, -4]));
