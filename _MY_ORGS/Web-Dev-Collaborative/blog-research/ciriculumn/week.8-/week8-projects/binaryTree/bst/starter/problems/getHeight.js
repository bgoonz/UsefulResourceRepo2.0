function getHeight(root) {
  if (!root) return -1;
  let currentRight = root.right;
  let currentLeft = root.left;
  let rightHeight = 0;
  let leftHeight = 0;
// find height of l.subtree
  // finde height of r.subtree
  // compare the two subtree height
  while (currentLeft) {
    currentLeft = currentLeft.left;
    leftHeight++;
  }
  while (currentRight) {
    currentRight = currentRight.right;
    rightHeight++;
  }
  if (leftHeight === rightHeight) return leftHeight;
  if (leftHeight > rightHeight) return leftHeight +=1;
  if(leftHeight < rightHeight) return rightHeight+=1
}


module.exports = {
  getHeight
};
