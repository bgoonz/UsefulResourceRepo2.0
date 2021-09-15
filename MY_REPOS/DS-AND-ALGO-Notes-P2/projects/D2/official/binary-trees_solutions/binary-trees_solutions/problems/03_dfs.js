// Iterative Solution
function dfs(root) {
  if (!root) return [];

  let stack = [root];
  let vals = [];

  while (stack.length) {
    let node = stack.pop();
    vals.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  };

  return vals;
}

// Recursive Solution
const dfsRec = (root) => {
  if (!root) return [];
  return [
    root.val,
    ...dfsRec(root.left),
    ...dfsRec(root.right)
  ]
}

module.exports = { dfs };