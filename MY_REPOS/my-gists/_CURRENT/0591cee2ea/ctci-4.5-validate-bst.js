// 4.5. Validate BST: Implement a function to check if a binary tree is a BST.
import { BinaryTree } from "../helpers/tree.js";

const isValidBST = (root) => {
  if (!root) return true;
  let check = {
    min: Number.NEGATIVE_INFINITY,
    max: Number.POSITIVE_INFINITY,
  };
  return validateBST(root, check);
};

function validateBST(node, check) {
  //console.log(node, check.min, check.max);
  if (node) {
    if (node.val <= check.min || node.val >= check.max) {
      return false;
    }

    //we need to redefine min and max.
    // The min value should be redefined and passed onto checking the left branch
    // The max value should be redefined and passed onto checking the right branch

    let checkMax = {
      min: check.min,
      max: node.val,
    };

    let checkMin = {
      min: node.val,
      max: check.max,
    };

    return (
      validateBST(node.left, checkMax) && validateBST(node.right, checkMin)
    );
  }
  return true;
}
