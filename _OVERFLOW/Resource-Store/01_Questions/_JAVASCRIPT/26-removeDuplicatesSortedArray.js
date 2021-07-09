/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = nums => {
    let start = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[start] !== nums[i]) {
            start++;
            nums[start] = nums[i];
        }
    }
    return start + 1;
};
