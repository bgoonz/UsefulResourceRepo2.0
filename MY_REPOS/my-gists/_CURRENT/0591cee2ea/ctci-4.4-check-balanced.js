// 4.4 Check balanced: Implement a function to check if a binary tree is balanced.
// For the purposes of this question, a balanced tree is defined to be a tree such
// that the heights of the two subtrees of any node never differ by more than one.

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
      _insertNode(this.root, newNode);
    }
  }
  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      // insert into the left
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      //insert into the right
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
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

  //Tree traversal
  preOrderTraversal(node, array) {
    //root, left, right
    if (!node) return array;
    array.push(node.value);
    array = preOrderTraversal(node.left, array);
    array = preOrderTraversal(node.right, array);
    return array;
  }

  inOrderTraversal(node, array) {
    //left, root, right
    if (!node) return array;

    array = inOrderTraversal(node.left, array);
    array.push(node.value);
    array = inOrderTraverse(node.right, array);
    return array;
  }

  postOrderTraversal(node, array) {
    //left, right, root
    if (!node) return array;

    array = postOrderTraversal(node.left, array);
    array = postOrderTraverse(node.right, array);
    array.push(node.value);
    return array;
  }
}

const isBalanced = (root) => {
  if (!root) return 0;

  let leftHeight = getHeight(root.left);
  let rightHeight = getHeight(root.right);

  return (
    Math.abs(leftHeight - rightHeight) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
};

function getHeight(node) {
  if (!node) return 0;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

//          15
//         /  \
//        10   25
//       / \   / \
//      7  13 22  27
//     / \    /
//    5   9  17
// Inserting nodes to the BinarySearchTree
var BST = new BinarySearchTree();
BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(3);
BST.insert(9);
console.log(BST.root);
BST.preOrderTraversal(BST.root);
console.log(isBalanced(BST)); //false

BST.insert(27);
BST.preOrderTraversal(BST.root);
console.log(isBalanced(BST)); //true
