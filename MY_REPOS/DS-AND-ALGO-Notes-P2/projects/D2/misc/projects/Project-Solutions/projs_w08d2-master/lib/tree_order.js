function inOrderArray(root) {
  // if the root is null, return an empty array
  if (!root) return []
  
  // get the array for visiting the left node
  // get the array for visiting the right node
  
  // return the left array concatenated with the root value
  //   concatenated with the right array
    return [ ...inOrderArray(root.left), root.val, ...inOrderArray(root.right) ]
  }

function postOrderArray(root) {
  if (!root) return[]
  // if the root is null, return an empty array

  // get the array for visiting the left node
  // get the array for visiting the right node

  // return the left array concatenated with the right array
  //   concatenated with the root value
  return [...postOrderArray(root.left), ...postOrderArray(root.right), root.val]
}


module.exports = {
  inOrderArray,
  postOrderArray
};
