/**
 * @param {number[]} nums
 * @return {number}
 */
// accepted, but not good.
var majorityElement = nums => {
    const appears = {};
    for (let i = 0; i < nums.length; i++) {
       if(appears[nums[i]]) {
           appears[nums[i]]++;
       } else {
           appears[nums[i]] = 1;
       }
    }

    for (key in appears) {
        if (appears[key] >= nums.length / 2) {
            return parseInt(key);
        }
    }
};

// better solution
var majorityElement = nums => {
    nums.sort((a, b) => {
        return a - b;
    });
    const mid = Math.floor(nums.length / 2);
    return nums[mid];
};
