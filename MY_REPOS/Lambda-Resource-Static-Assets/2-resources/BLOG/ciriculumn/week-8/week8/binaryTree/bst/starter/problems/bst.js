class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(val, root = this.root) {
    const newNode = new TreeNode(val);
    if (!root) {
      this.root = newNode;
      return this;
    }
    if (val < root.val) {
      if(!root.left) {
        root.left = newNode;
      } else {
        this.insert(val, root.left);
      }
    } else {
      if(!root.right) {
        root.right = newNode;
      } else {
        this.insert(val, root.right)
      }
    }
  }
  searchRecur(val, root = this.root) {
    if (!root) return false;
    if(val < root.val) {
      return this.searchRecur(val, root.left)
    } else if (val > root.val) {
      return this.searchRecur(val, root.right)
    } else if (val === root.val) {
      return true;
    }
  }
  searchIter(val) {
    if (!this.root) return false;
    let current = this.root;
    let found = false;
    while (current && !found) {
      if (val < current.val) {
        current = current.left;
      }
      else if (val > current.val) {
        current = current.right;
      }
      else {
        found = true
      }
    }
    return found;

  }
}

//     10
//  9     12

module.exports = {
  TreeNode,
  BST
};

