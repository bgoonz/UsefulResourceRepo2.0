/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const sortedArrayToBST = nums => {
    const high = nums.length - 1;
    return arrayToBSTHelper(nums, 0, high);
};

var arrayToBSTHelper = (nums, low, high) => {
    if (low > high) return null;
    const mid = low + Math.floor((high - low) / 2);
    const root = new TreeNode(nums[mid]);
    root.left = arrayToBSTHelper(nums, low, mid - 1);
    root.right = arrayToBSTHelper(nums, mid + 1, high);
    return root;
};
