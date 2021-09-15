// Given a binary tree, find its maximum depth.

// The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Note: A leaf is a node with no children.

// Example:

// Given binary tree [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its depth = 3.

let example = [ 3, 9, 20, null, null, 15, 7 ];
class Tree {
  constructor ( value ) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

let smallTree = new Tree(3);
smallTree.left = new Tree(9);
smallTree.right = new Tree(20);
smallTree.right.left = new Tree(15);
smallTree.right.right = new Tree(7);

var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  let max = 0;

  function outer(root, level = 1) {
    //base case
    if (root === null) {
      return;
    }

    //update max variable at each level
    max = Math.max(max, level);

    //run recursive call on node left and right
    outer(root.left, level + 1);
    outer(root.right, level + 1);
  }
  outer(root);
  return max;
};


console.log('maxDepth(example): ', maxDepth(example));
