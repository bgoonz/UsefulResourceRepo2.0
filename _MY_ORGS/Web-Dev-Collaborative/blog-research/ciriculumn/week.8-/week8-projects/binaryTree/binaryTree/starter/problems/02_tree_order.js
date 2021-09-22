function preOrderArray(root) {
  if (root === null) return [];

  let left = preOrderArray(root.left);
  let right = preOrderArray(root.right);

  let preOrderTree = [root.val].concat(left).concat(right);
  return preOrderTree;
}

function inOrderArray(root) {
  if (!root) return [];
  let left = inOrderArray(root.left);
  let right = inOrderArray(root.right);

  let inOrderTree = left.concat(root.val).concat(right);
  return inOrderTree;
}

function postOrderArray(root) {
  if (!root) return [];
  let left = postOrderArray(root.left);
  let right = postOrderArray(root.right);

  let postOrderTree = left.concat(right).concat(root.val);
  return postOrderTree;
}


module.exports = {
  preOrderArray,
  inOrderArray,
  postOrderArray
};
