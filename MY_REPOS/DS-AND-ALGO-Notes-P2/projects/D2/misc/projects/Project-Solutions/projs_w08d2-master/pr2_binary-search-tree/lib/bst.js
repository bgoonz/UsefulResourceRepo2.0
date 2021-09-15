class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}


class BST {
  constructor() {
    this.root = null
  }

  insert(val, node = this.root) {
    const newNode = new TreeNode(val)
    if (!node) return this.root = newNode
    if (val < node.val) {
      if (!node.left) node.left = newNode
      else this.insert(val, node.left)
    } else {
      if (!node.right) node.right = newNode
      else this.insert(val, node.right)
    }
  }

  searchRecur(val, node = this.root) {
    if (!node) return false
    if (val === node.val) return true
    else if (val < node.val) return this.searchRecur(val, node.left)
    else if (val > node.val) return this.searchRecur(val, node.right)
  }

  searchIter(value) {
    if (!this.root) return false
    if (value === this.root.val) return true
    let node = this.root
    while (node) {
      if (node.val === value) return true
      else if (node.val < value) node = node.right
      else node = node.left
    }
    return false
  }
}

module.exports = {
  TreeNode,
  BST
};
