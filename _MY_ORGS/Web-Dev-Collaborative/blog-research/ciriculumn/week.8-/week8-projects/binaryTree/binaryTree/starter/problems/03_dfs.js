function dfs(root){
    if (!root) return [];

    let left = dfs(root.left);
    let right = dfs(root.right);

    let dfsTree = [root.val].concat(left).concat(right);
    return dfsTree;
}

module.exports = { dfs };
