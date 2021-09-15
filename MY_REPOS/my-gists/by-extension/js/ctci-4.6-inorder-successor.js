// 4.6. Successor: Write an algorithm to find the "next" node (i.e., in-order successor)
// of a given node in a BST. You may assume that each node has a link to its parent.
import { BinaryTree } from "../helpers/tree.js";

const inOrderSuccessor = (root) => {
  if (!root) return null;

  //if node has right subtree, get the min of left subtree.
  if (root.right) return findMinLeft(root.right);
  if (!root.right) return closestAncestorAsLeftChild(root);
};

function findMinLeft(node) {
  if (!node.left) return node;

  return findMin(node.left);
}

function closestAncestorAsLeftChild(node) {
  if (!node || !node.parent) return null;
  if (node.parent.value > node.value) return node.parent; //node is left child

  return closestAncestorAsLeftChild(node.parent);
}
