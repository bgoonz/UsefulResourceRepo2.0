/*
  ## Problem 3: Path Sum of Binary Tree

Given the binary tree below and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

Use the following test-case: pathSum(5, 22) where 5 is the root node and 22 is the sum.
Note: this function should return a boolean value indicating whether or not the sum is possible to achieve.

```js
//       5
//      / \
//     4   8
//    /   / \
//   11  13  4
//  /  \      \
// 7    2      1
[5,4,11,7,2,8,13,4,1]

[5,4,11,7]
[5,4,11,2]
[5,8,13]
[5,8,4,1]
*/

//we want to subtract from the target until we get down to our base case

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
class BST {
    constructor() {
        this.root = null;
    }
}
/*
//       5
//      / \
//     4   8
//    /   / \
//   11  13  4
//  /  \      \
// 7    2      1

*/
const node5 = new TreeNode(5);
const node4 = new TreeNode(4);
const node11 = new TreeNode(11);
const node7 = new TreeNode(7);
const node2 = new TreeNode(2);
const node8 = new TreeNode(8);
const node13 = new TreeNode(13);
const node4theSecond = new TreeNode(4);
const node1 = new TreeNode(1);
node5.left = node4;
node5.right = node8;
node4.left = node11;
node11.left = node7;
node11.right = node2;
node8.left = node13;
node8.right = node4;
node4theSecond.right = node1;

function pathSum(root, targetSum) {
    if (!root) return false;
    let difference = targetSum - root.val;
    if (!root.left && !root.right) {
        if (difference == 0) return true;
    }
    let leftBranch = pathSum(root.left, difference);
    let rightBranch = pathSum(root.right, difference);
    return leftBranch || rightBranch;
}

console.log("pathSum(node5,22): ", pathSum(node5, 22));
