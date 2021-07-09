/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = root => {
    if (!root) return true;
    if (getHeight(root) === -1) return false;
    return true;
};

var getHeight = root => {
    if (!root) return 0;
    const leftHeight = getHeight(root.left);
    if (leftHeight === -1) return -1;
    const rightHeight = getHeight(root.right);
    if (rightHeight === -1) return -1;
    if (leftHeight === -1 || rightHeight === -1) return -1;
    const heightDiff = Math.abs(leftHeight - rightHeight);
    if (heightDiff > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
}
