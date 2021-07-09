/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// too slow?
var merge = (nums1, m, nums2, n) => {
    const nums3 = [];
    for (var i = 0; i < m; i++) {
        nums3[i] = nums1[i];
    }
    for (var i = m; i < m + n; i++) {
        nums3[i] = nums2[i - m];
    }
    let head1 = 0;
    let head2 = m;
    for (var i = 0; i < m + n; i++) {
        if (head1 >= m) nums1[i] = nums3[head2++];
        else if (head2 >= m + n) nums1[i] = nums3[head1++];
        else if (nums3[head1] <= nums3[head2]) nums1[i] = nums3[head1++];
        else nums1[i] = nums3[head2++];
    }
};

// without an auxiliary array, but still too slow... why?
var merge = (nums1, m, nums2, n) => {
    let tail1 = m - 1;
    let tail2 = n - 1;
    for (let i = m + n -1; i >= 0; i--) {
        if (tail1 < 0) {
            nums1[i] = nums2[tail2--];
        } else if (tail2 < 0) {
            nums1[i] = nums1[tail1--];
        } else if (nums1[tail1] <= nums2[tail2]) {
            nums1[i] = nums2[tail2--];
        } else if ((nums2[tail2] < nums1[tail1])) {
            nums1[i] = nums1[tail1--];
        }
    }
};
