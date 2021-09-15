/*
A Tree is a Graph with no cycles
It must be "rooted" - one node from which all other nodes are accessible
*this means we can pass an entire tree to a function by just passing the root node as an arg

Binary Tree:
nodes have at most 2 children
*this means a node could also have 0 or 1 child
*/

class TreeNode {
  constructor(val) {
    this.value = val;
    this.right = null;
    this.left = null;
  }
}

let a = new TreeNode("a");
let b = new TreeNode("b");
let c = new TreeNode("c");
let d = new TreeNode("d");
let e = new TreeNode("e");
let f = new TreeNode("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

/* visual representation of above tree:
          A
        /  \
      B     C
    /  \      \
  D     E     F
*/

/* Tree Traversals:
Inorder, Preorder, Postorder

we want to print all the nodes in the tree
recursive
base case is when the tree is empty / the root is empty
*/

// using the above tree, this will print: d, b, e, a, c, f
// prints the childen, then the root, then left
// THEN it backs up to the previous root and starts over
function inOrderPrint(root) {
  if (!root) return;
  inOrderPrint(root.left);
  console.log(root.value);
  inOrderPrint(root.right);
}

// using the above tree, this will print: a, b, d, e, c, f
// prints each node as you examine it.
function preOrderPrint(root) {
  if (!root) return;
  console.log(root.value);
  preOrderPrint(root.left);
  preOrderPrint(root.right);
}

// using the above tree, this will print: d, e, b, f, c, a
// prints children first, left, then right, then the root
function postOrderPrint(root) {
  if (!root) return;
  postOrderPrint(root.left);
  postOrderPrint(root.right);
  console.log(root.value);
}


console.log(inOrderPrint(a))
