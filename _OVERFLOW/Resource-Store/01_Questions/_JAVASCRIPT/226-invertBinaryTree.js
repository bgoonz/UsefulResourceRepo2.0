/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = root => {
  if (root === null) { return null; }
  const node = root.left;
  root.left = root.right;
  root.right = node;
  if (root.left) { invertTree(root.left); }
  if (root.right) { invertTree(root.right); }
  return root;
};
