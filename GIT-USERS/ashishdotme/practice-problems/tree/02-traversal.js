/**
 *
 * Ashish Patel
 * e: ashishsushilPatel@gmail.com
 * w: https://ashish.me
 *
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

const t1 = new TreeNode(7);
t1.left = new TreeNode(5);
t1.left.left = new TreeNode(2);
t1.left.right = new TreeNode(6);
t1.right = new TreeNode(9);
t1.right.left = new TreeNode(8);
t1.right.right = new TreeNode(10);

var preOrder = function (root) {
  if (root == null) {
    return;
  }
  console.log(root.val);
  preOrder(root.left);
  preOrder(root.right);
};
console.log("--PREORDER---");
console.log(preOrder(t1));
console.log("--------------------------");

var InOrder = function (root) {
  if (root == null) {
    return;
  }
  InOrder(root.left);
  console.log(root.val);
  InOrder(root.right);
};
console.log("--InOrder---");
console.log(InOrder(t1));
console.log("--------------------------");

var postOrder = function (root) {
  if (root == null) {
    return;
  }
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
};
console.log("--POSTORDER---");
console.log(postOrder(t1));
console.log("--------------------------");
