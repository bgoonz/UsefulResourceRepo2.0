class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let a = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

function breadthFirstArray(root) {
  if (!root) return null;

  let queue = [ root ]
  let res = []
  while (queue.length) {
    let node = queue.shift();
    res.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right)
  }

  return res
}

console.log(breadthFirstArray(a))

module.exports = {
    breadthFirstArray
};