// 4.8. First Common Ancestor: Design an algorithm and write code to find 
// the first common ancestor of two nodes in a binary tree. Avoid storing 
// additional nodes in a data structure. Note: This is not necessarily a binary search tree.
import { BinaryTree } from "../helpers/tree.js";

const firstCommonAncestor = (root, p, q) =>{
  if(!root) 
    return null;
  
  //If p contains q, or q contains p
  if(root.value === p.value || root.value === q.value) 
    return root;

  //check if subtree contains node. If false, node is on right subtree
  let checkLeftP = hasAncestor(root.left, p); 
  let checkLeftQ = hasAncestor(root.left, q);

  //they're on different sides, so return root
  if((checkLeftP && !checkLeftQ) || (!checkLeftP && checkLeftQ))
    return root;

  //if they're on the same side, we need to traverse down
  let childSide = checkLeftP ? root.left : root.right;
  return firstCommonAncestor(childSide, p, q);
}

//Check if particular branch contains value
function hasAncestor = (root, n) => {
  if(!root) return false;

  if(root.val === n.value)
    return true;

  return hasAncestor(root.left, n) || hasAncestor(root.right, n);
}
