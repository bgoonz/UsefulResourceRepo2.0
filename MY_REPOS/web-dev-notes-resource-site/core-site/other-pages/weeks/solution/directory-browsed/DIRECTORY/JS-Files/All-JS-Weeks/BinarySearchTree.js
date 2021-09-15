// Given a sorted (increasing order) array with unique integer elements, write an
// algo­rithm to create a binary search tree with minimal height.

// Input: Array
// Example: [1, 3, 5, 8, 19, 23, 24, 31]
// Expected Output:
//         19
//        /   \
//      5      24
//    /  \    /  \
//   3    8  23   31
//  /
// 1

class TreeNode {
  constructor(val) {
    this.value = val;
    this.left = this.right = null;
  }
}

function buildBST(array) {
  if (!array.length) return null;
  let midIdx = Math.floor(array.length / 2);
  let root = new TreeNode(array[midIdx]);
  root.left = buildBST(array.slice(0, midIdx));
  root.right = buildBST(array.slice(midIdx + 1));

  return root;
}

function isBalanced(root) {
  let stack = [[root, 0]];
  let maxHeight = 0;
  let minHeight = Infinity;

  while (stack.length) {
    if ((maxHeight - minHeight) > 1) return false;

    let [currentNode, level] = stack.pop();
    
    if (currentNode) {
      // Depth First search 
      // when to return false? 
      // when we get to a leaf node or a node with only 1 child
      if (currentNode.left === null || currentNode.right === null) {
        if (level > maxHeight) maxHeight = level;
        if (level < minHeight) minHeight = level;
      }
      stack.push([currentNode.left, level + 1])
      stack.push([currentNode.right, level + 1])
    }
  }
  console.log(`maxHeight: ${maxHeight}`)
  console.log(`minHeight: ${minHeight}`)
  return true;
}

let balancedTree = buildBST([1, 3, 5, 8, 19, 23, 24, 31])
let unbalancedTree = new TreeNode(12)
unbalancedTree.left = new TreeNode(8)
unbalancedTree.left.left = new TreeNode(5)
unbalancedTree.left.right = new TreeNode(9)
unbalancedTree.left.left.left = new TreeNode(1)
unbalancedTree.left.left.left.left = new TreeNode(0)
unbalancedTree.right = new TreeNode(14)
unbalancedTree.right.right = new TreeNode(18)


console.log(isBalanced(balancedTree)) 
// should return true
console.log(isBalanced(unbalancedTree))
// should return false