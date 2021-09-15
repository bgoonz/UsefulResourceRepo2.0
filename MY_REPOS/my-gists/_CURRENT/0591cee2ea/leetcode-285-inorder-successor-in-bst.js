// 4.6. Follow up - Successor: Write an algorithm to find the "next" node (i.e., in-order successor)
// of a given node in a BST. Node do not have a link to its parent.
import { BinaryTree } from "../helpers/tree.js";

const inorderSuccessor = (root, p) => {
  if (!p) return null;

  //if node has right subtree, get the min of left subtree.
  if (p.right) return findMinLeft(p.right);
  if (!p.right) return closestAncestorAsLeftChild(root, p);
};

function findMinLeft(node) {
  if (!node.left) return node;

  return findMinLeft(node.left);
}

function closestAncestorAsLeftChild(root, node) {
  if (!node) return null;

  let successor = null;
  let originalRoot = root;

  while (root) {
    if (node.value > root.value) {
      //record parent while traversing down tree
      root = root.right;
    } else if (node.value < root.value) {
      successor = root;
      root = root.left;
    } else {
      break;
    }
  }

  return successor;
}
