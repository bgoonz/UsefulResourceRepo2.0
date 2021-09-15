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

const t2 = new TreeNode(1);
t2.left = new TreeNode(2);
t2.left = new TreeNode(2);
t2.left.left = new TreeNode(4);
t2.left.right = new TreeNode(5);
t2.right = new TreeNode(3);
t2.right.left = new TreeNode(6);

var isSameTree = function (t1, t2) {
  if (t1 == null && t2 == null) {
    return true;
  }
  if (t1 && t2 && t1.val == t2.val) {
    return isSameTree(t1.left, t2.left) && isSameTree(t1.right, t2.right);
  }
  return false;
};

console.log(isSameTree(t1, t2));
