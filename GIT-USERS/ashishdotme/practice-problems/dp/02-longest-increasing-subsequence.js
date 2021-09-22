/**
 *
 * Ashish Patel
 * e: ashishsushilPatel@gmail.com
 * w: https://ashish.me
 *
 */

const longestIncreasingSubsequence = (val) => {
  let max = 0;
  let ls = [];
  for (let i = 0; i < val.length; i++) {
    ls[i] = 1;
    for (let j = 0; j < i; j++) {
      if (val[i] > val[j] && ls[j] + 1 > ls[i]) {
        ls[i] = ls[j] + 1;
      }
    }
    max = Math.max(max, ls[i]);
  }
  return max;
};

console.log(longestIncreasingSubsequence([0, 1, 0, 3, 2, 3]));

// [1, 2, 1, 3, 3, 3]
max = 3;
// [1, 2, 1, 3, 3, 4]
