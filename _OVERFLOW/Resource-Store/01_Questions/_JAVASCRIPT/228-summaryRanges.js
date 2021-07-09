/**
 * @param {number[]} nums
 * @return {string[]}
 */
const summaryRanges = nums => {
    const ranges = [];
    for (let i = 0; i < nums.length; i++) {
        let j = i;
        while (nums[j+1]) {
            if ((nums[j+1] - nums[j]) === 1) j++;
            else break;
        }
        if (nums[i] !== nums[j]) {
            ranges.push(`${nums[i]}->${nums[j]}`);
        } else {
            ranges.push(`${nums[i]}`);
        }
        i = j;
    }

    return ranges;
};
