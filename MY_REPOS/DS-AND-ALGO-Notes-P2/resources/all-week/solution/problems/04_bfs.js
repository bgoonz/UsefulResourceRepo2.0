function bfs(root){
  if (!root) return [];

  let queue = [root];
  let vals = [];

  while (queue.length){
    let node = queue.shift();
    vals.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return vals;
}

module.exports = { bfs };