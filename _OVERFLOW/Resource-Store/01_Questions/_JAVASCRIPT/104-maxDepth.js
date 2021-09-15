/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = root => {
  let max = 0;
  const lmax = maxDepth(root.left);
  const rmax = maxDepth(root.right);
  if (lmax > rmax) {
      root = root.left;
      max = lmax;
  } else {
      root = root.right;
      max = rmax;
  }
  return max + 1;
}

// second try
var maxDepth = root => {
    if (!root) return 0;
    const lHeight = maxDepth(root.left) + 1;
    const rHeight = maxDepth(root.right) + 1;
    return lHeight > rHeight ? lHeight : rHeight;
};

// simplist
var maxDepth = root => {
    if (!root) {
        return 0;
    }

    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
