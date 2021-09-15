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

const t1 = new TreeNode(1);
t1.left = new TreeNode(2);
t1.left = new TreeNode(2);
t1.left.left = new TreeNode(4);
t1.left.right = new TreeNode(5);
t1.right = new TreeNode(3);
t1.right.left = new TreeNode(6);

var countNodes = function (root) {
  if (root == null) {
    return 0;
  }
  return countNodes(root.left) + countNodes(root.right) + 1;
};

console.log(countNodes(t1));

// const print = () => {
//   print('', this, false)
// }

const print = (n) => {
  let prefix = "";
  let isLeft = "";
  const innerPrint = (prefix, n, isLeft) => {
    if (n != null) {
      innerPrint(prefix + "     ", n.right, false);
      console.log(prefix + "|-- " + n.val);
      innerPrint(prefix + "     ", n.left, true);
    }
  };
  innerPrint(prefix, n, isLeft);
};

console.log(print(t1));
