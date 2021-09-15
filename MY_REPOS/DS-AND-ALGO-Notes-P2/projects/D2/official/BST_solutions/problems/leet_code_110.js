// View the full problem and run the test cases at:
//  https://leetcode.com/problems/balanced-binary-tree/

function getHeight(root) {
  if (!root) return -1;
  return 1 + Math.max(getHeight(root.left), getHeight(root.right));
}

function isBalanced(root) {
  if (!root) return true;

  // check to see if the top level of the tree is balanced
  let heightDifference =
    Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1;

  // also check to see if the left and right subtrees are balanced
  return heightDifference && isBalanced(root.left) && isBalanced(root.right);
}
