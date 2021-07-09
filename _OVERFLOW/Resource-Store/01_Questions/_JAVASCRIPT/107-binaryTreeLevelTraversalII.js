/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrderBottom = root => {
    const results = [];
    helper(root, 0, results);
    return results;
};

var helper = (node, level, results) => {
    if (!node) return results;
    if (level >= results.length) {
        // insert level result array reversely
        results.unshift([]);
    }
    results[results.length - level - 1].push(node.val);
    helper(node.left, level + 1, results);
    helper(node.right, level + 1, results);
};
