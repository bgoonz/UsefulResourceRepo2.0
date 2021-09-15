class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
let a = new TreeNode("a");
let b = new TreeNode("b");
let c = new TreeNode("c");
let d = new TreeNode("d");
let e = new TreeNode("e");
let f = new TreeNode("f");

a.right = c;
b.left = d;
b.right = e;
c.right = f;
console.log(a);
/*
  TreeNode {
  val: 'a',
  left: null,
  right: TreeNode {
    val: 'c',
    left: null,
    right: TreeNode { val: 'f', left: null, right: null }
  }
}
*/
function inOrderPrint(root) {
  if ((root = null)) return; //base case
  inOrderPrint(root.left);
  console.log(root.val);
  inOrderPrint(root.right);
}

//!
