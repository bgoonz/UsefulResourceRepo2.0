
function inOrderArray(root) {
  
  // if the root is null, return an empty array
  if (root === null) return [];
 
  // get the array for visiting the left node
  let leftArray = inOrderArray(root.left);
  // get the array for visiting the right node
  let rightArray = inOrderArray(root.right);

  // return the left array concatenated with the root value
  let answer = leftArray.concat(root.val).concat(rightArray);
  

  return answer;


  //   concatenated with the right array
}

function postOrderArray(root) {
  // if the root is null, return an empty array
  if (!root) return []
  
  // get the array for visiting the left node
  let leftArray = postOrderArray(root.left);
  // get the array for visiting the right node
  let rightArray = postOrderArray(root.right);
  
  // return the left array concatenated with the right array concatenated with the root value
  
  let answer = leftArray.concat(rightArray).concat(root.val);
  
  return answer
  
}

module.exports = {
  inOrderArray,
  postOrderArray,
};
