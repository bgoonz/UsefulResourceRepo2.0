// View the full problem and run the test cases at:
//  https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]

const { TreeNode } = require('./01_tree_node.js');

function buildTree(preorder, inorder) {
    const root = new TreeNode(preorder[0]);
    if (!inorder.length && !preorder.length) return null;
    // if (inorder.length === 1) return newNode;
    let midIdx = inorder.indexOf(preorder[0]);
    let left = inorder.slice(0, midIdx);
    let right = inorder.slice(midIdx + 1);



}
