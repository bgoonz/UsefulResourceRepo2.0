/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
const pathSum = (root, sum) => {
  const result = [];
  const results = [];
  pathSumHelper(root, sum, result, results);
  return results;
};

var pathSumHelper = (root, sum, result, results) => {
  if (!root) {
      return;
  }
  result.push(root.val);
  if (!root.left && !root.right && sum === root.val) {
      results.push(result.slice());
  }
  pathSumHelper(root.left, sum - root.val, result, results);
  pathSumHelper(root.right, sum - root.val, result, results);
  result.pop();
};
