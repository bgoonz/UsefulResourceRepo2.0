/* 
DFS: Depth First Search
Traverse a tree all the way until you hit a leaf node before switching branches
Utlize a stack
this can be done recursively, because recursion utilizes a call stack

BFS: Breadth First Search
Traverse each level of nodes before moving down the branch
Utilize a queue
you would rarely use recursion to implement this, because you want to use a queue and not a stack.
*/

class TreeNode {
  constructor(val) {
    this.value = val;
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

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;


// as you traverse the depth of the tree, add nodes to the stack to be examined
// where you console.log on line 39 is where you would do any kind of search logic, if this was a DFS
// a node is considered 'visited' each time you pop() a node, not when you push() it. 
function depthFirst(root) {
  let stack = [ root ];
  while (stack.length) {
    let node = stack.pop();
    console.log(node.value);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left)
  }
}

// can also write this recursively, as recursion utilizes the call stack:
function depthFirstRecursive(root) {
  if (!root) return null;
  console.log(root.val);
  depthFirstRecursive(root.left);
  depthFirstRecursive(root.right);
}


// as you traverse the tree, push nodes into the queue to be examined
// line 63 is where you would do any search logic if this was BFS
// instead of popping elements off the end of the array, you shift() from the front of the array
// this is how you cover the level first before advancing down the branch
function breadthFirst(root) {
  let queue = [ root ];

  while (queue.length) {
    let node = queue.shift();

    console.log(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}

