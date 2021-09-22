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

const t1 = new TreeNode(0);
t1.left = new TreeNode(9);
t1.right = new TreeNode(20);
t1.right.left = new TreeNode(15);
t1.right.right = new TreeNode(7);

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

const levelOrderTraversal = (root) => {
  if (!root) {
    return [];
  }
  let queue = [root];
  let result = [];
  while (queue.length !== 0) {
    let tempQueue = [];
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      const currentNode = queue.shift();
      if (currentNode) {
        tempQueue.push(currentNode.val);
      }
      if (currentNode && currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode && currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    result.push(tempQueue);
  }
  return result;
};

console.table(levelOrderTraversal(t1));
