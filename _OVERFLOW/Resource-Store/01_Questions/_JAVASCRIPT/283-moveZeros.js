/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = nums => {
  let i = 0;
  let j = nums.length;
  while (i < j) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
      j--;
    } else {
      i++;
    }
  }
};

// two pointers
var moveZeroes = nums => {
    let newStart = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[newStart] = nums[i];
            newStart++;
        }
    }

    while (newStart < nums.length) {
        nums[newStart] = 0;
        newStart++;
    }
};
