// Write a function that takes in the root of a
// binary search tree and returns the height.
// You may use your BST implementation to test this out.
// [*] Understand
// [] Plan
// [] Execute
// [] Improve

// Plan
// [] If there is not root
  // [] return -1
// [] Use Math.max on getHeight on the left and right children
// [] Sum up all of the levels
function getHeight(root) {
  // [] If there is not root
    // [] return -1
  if (!root) return -1;
  // [] Use Math.max on getHeight on the left and right children
  // [] Sum up all of the levels
  // return Math.max(1 + getHeight(root.left), 1 + getHeight(root.right))
  return 1 + Math.max(getHeight(root.left), getHeight(root.right))
}


module.exports = {
  getHeight
};