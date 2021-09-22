// ! create a treenode constructor with given properties
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

root = new TreeNode("a");
let b = new TreeNode("b");
let c = new TreeNode("c");
let d = new TreeNode("d");
let e = new TreeNode("e");
let f = new TreeNode("f");
root.left = b;
root.right = c;
b.left = d;
b.right = e;
c.right = f;

module.exports = {
  TreeNode,
};
