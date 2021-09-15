const threeSumClosest = (nums, target) => {
  let len = nums.length,
    sum = 0;
  if (len === 0) return 0;
  if (len <= 3) {
    for (let i = 0; i < len; i++) {
      sum += nums[i];
    }
    return sum;
  }
  nums.sort(function (a, b) {
    return a - b;
  });

  let closest = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < len; i++) {
    for (let j = i + 1, k = len - 1; j < len - 1, j < k; ) {
      var sum = nums[i] + nums[j] + nums[k];
      if (sum === target) {
        return sum;
      } else if (sum < target) {
        if (
          (closest < sum && sum < target) ||
          Math.abs(target - sum) < Math.abs(target - closest)
        ) {
          closest = sum;
        }
        j++;
      } else if (sum > target) {
        if (
          (closest > sum && sum > target) ||
          Math.abs(target - sum) < Math.abs(target - closest)
        ) {
          closest = sum;
        }
        k--; //to reduce sum decrease tail
      }
    }
  }
  return closest;
};
