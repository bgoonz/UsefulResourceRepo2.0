// 4.2. Minimal Tree:
// Minimal Tree: Given a sorted (increasing order) array with unique integer elements,
// write an algorithm to create a binary search tree with minimal height.

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.parent = this.left = this.right = null;
  }
}

class BinaryTree {
  constructor(value) {
    this.root = value || null;
  }

  //Insert a node into a BST
  insert(value) {
    const newNode = new BinaryTreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      let node = this.root;
      let branch;
      while (node) {
        // nodes on the left must less than nodes on the right
        branch = value <= node.value ? "left" : "right";
        if (node[branch] === null) {
          break;
        }
        node = node[branch];
      }
      newNode.parent = node;
      node[branch] = newNode;
    }
  }
  //Remove a node from BST
  removeNode(data) {
    this.root = _removeNode(this.root, data);
  }
  _removeNode(node, data) {
    if (node === null) return null;
    if (data < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    if (data > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    //if node === node.data
    // current node has no children
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }
    // node has one child
    if (node.left === null) {
      node = node.right;
      return node;
    }
    if (node.right === null) {
      node = node.left;
      return node;
    }

    // node has two children -
    // 1. Find the min value of its right subtree and use this as
    // the node.
    // 2. remove the min value from right subtree
    let temp = this._findMinNode(node.right);
    node.data = temp.data;
    //remove min node from right subtree
    node.right = this._removeNode(node.right, temp.data);
    return node;
  }

  _findMinNode(node) {
    if (node.left === null) return node; //this must be min node

    return _findMinNode(node.left);
  }
}

const createBST = (arr) => {
  let tree = new BinaryTree();
  if (arr && arr.length) {
    addNode(tree, arr, 0, arr.length - 1);
  }
  console.log(tree);
  return tree;
};

function addNode(tree, arr, start, end) {
  if (start === end) {
    tree.insert(arr[start]);
  }

  if (start < end) {
    let mid = start + parseInt((end - start) / 2);
    tree.insert(arr[mid]);

    addNode(tree, arr, start, mid - 1);
    addNode(tree, arr, mid + 1, end);
  }
}

createBST([1, 2, 3, 4, 5, 6, 7]);
