function findMin(root) {
  if (!root) return null;
  if (!root.left && !root.right) return root;

  if (!root.left) return root;
  let keepGoing = true
  let current = root.left
  while (keepGoing) {
    current = current.left;
    if (current.left === null){
      keepGoing = false;
    }
  }
  return current;
}



module.exports = {
  findMin
};
