/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = root => {
    if (!root) return;
    let oRoot = root;
    flatten(root.left);
    flatten(root.right);
    const oRight = oRoot.right;
    oRoot.right = oRoot.left;
    oRoot.left = null;
    while (oRoot.right) oRoot = oRoot.right;
    oRoot.right = oRight;
};

// 2nd try
var flatten = root => {
    if (!root) return;
    // save right now
    const tmp = root.right;
    flatten(root.left);
    flatten(root.right);
    root.right = root.left;
    root.left = null;
    while (root.right) {
        root = root.right;
    }
    root.right = tmp;
};
