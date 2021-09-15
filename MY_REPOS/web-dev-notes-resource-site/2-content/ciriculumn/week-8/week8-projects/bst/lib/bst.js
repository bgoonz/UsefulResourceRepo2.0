// ! Create node Class that initializes properties for a tree node
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
    // if root doesn't exist create it 
    if (!this.root) {
      this.root = new TreeNode(val);
      return;
    }

    // if val is less than root.val, create node, & insert @ root.left if root.left DNE
    if (val < root.val) {
      if (!root.left) {
        root.left = new TreeNode(val);
      } else {
        this.insert(val, root.left);
      }
    } else {
      // if val is more than root.val, create node & insert @ root.right if it DNE
      if (!root.right) {
        root.right = new TreeNode(val);
      } else {
        this.insert(val, root.right);
      }
    }
  }

  searchRecur(val, root = this.root) {
    if (!root) return false;
    // ! search left root if val < root.val or right root if val > root val
    // recurse using the that searched node as a root
    if (val < root.val) {
      return this.searchRecur(val, root.left);
    } else if (val > root.val) {
      return this.searchRecur(val, root.right);
    } else {
      // if it isnt < or > its === so return true
      return true;
    }
  }
  searchIter(val) {
    // define temp as the holder of node searched
    let temp = this.root
    // will BO when temp.right or temp.left is null for the node ie it is the leaf of the tree
    while (temp !== null) {
      if (val < temp.val) {
        temp = temp.left
      } else if(val > temp.val){
        temp = temp.right
        // if it isnt < or > its === so return true
      } else {
        return true
      }
    }
    return false
  }

  
}

let tree = new BST();
tree.insert(10);
tree.insert(5);
tree.insert(16);
tree.insert(1);
tree.insert(7);
tree.insert(16);

console.log(tree);

module.exports = {
  TreeNode,
  BST,
};
