// View the full problem and run the test cases at:
//  https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

let nums = [-10,-3,0,5,9];
function sortedArrayToBST(nums) {
    for(let i = 0; i < nums.length; i++){
        nums[i]
        console.log("sortedArrayToBST -> nums[i]", nums[i])
        nums[i]
        console.log("sortedArrayToBST -> nums[i]", nums[i])
    }


}
sortedArrayToBST(nums)