function median(a1, a2) {
  let x = a1.concat(a2);
  x.sort((a, b) => {
    return a - b;
  });
  let len = x.length;

  if (len % 2 === 0) {
    return (x[Math.floor(len / 2) - 1] + x[Math.ceil(len / 2)]) / 2;
  } else {
    return x[Math.floor(len / 2)];
  }
}

let a = [0, 2, 3, 5, 9];
let b = [1, 4];
console.log(median(a, b));
/*
Algorithms in Javascript: Leetcode 4. Median of Two Sorted Arrays - There are two sorted arrays nums1 and nums2 of size m and n respectively. Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)). You may assume nums1 and nums2 cannot be both empty.

*/
