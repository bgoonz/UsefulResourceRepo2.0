/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = nums => {
    let max = nums[0];
    const sums = [max];
    for (let i = 1; i < nums.length; i++) {
        // here is the key, the dynamic programming formation,
        // sums means maximunEndingHere (at i), it is always the maxium value of
        // current element value and the previous max plus the current element itself.
        sums[i] = Math.max((sums[i - 1] + nums[i]), nums[i]);
        max = Math.max(max, sums[i]);
    }

    return max;
};
