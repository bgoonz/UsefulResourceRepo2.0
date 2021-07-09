/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = nums => {
  const appears = {};
  let containsDuplicate = false;
  for (let i = 0; i < nums.length; i++) {
    if (appears[nums[i]]) {
      appears[nums[i]] += 1;
      containsDuplicate = true;
      break;
    } else {
      appears[nums[i]] = 1;
    }
  }

  return containsDuplicate;
};
