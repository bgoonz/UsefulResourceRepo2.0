# Example Binary Tree

### Visual Aid

---

## ![picture alt](https://assets.aaonline.io/data_structures_algorithms/trees/images/graph_a.png)

---

### Example Code

---

```js
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let a = new TreeNode("a");
let b = new TreeNode("b");
let c = new TreeNode("c");
let d = new TreeNode("d");
let e = new TreeNode("e");
let f = new TreeNode("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
```

---

---

# Terms

- tree - graph with no cycles
- binary tree - tree where nodes have at most 2 nodes
- root - the ultimate parent, the single node of a tree that can access every other node through edges; by definition the root will not have a parent
- internal node - a node that has children
- leaf - a node that does not have any children
- path - a series of nodes that can be traveled through edges - for example A, B, E is a path through the above tree

---

# Search Patterns

- Breadth First Search - Check all nodes at a level before moving down a level
- Depth First Search - Check the depth as far as it goes for one child, before
  moving on to the next child.
  - Pre-Order Traversal - Access the data of the current node, recursively visit the left sub tree, recursively visit the right sub tree
  - In-Order Traversal - Recursively visit the left sub tree, access the data of the current node, recursively visit the right sub tree
  - Post-Order Traversal - Recursively visit the left sub tree, recursively visit the right sub tree, access the data of the current node.

---

# Constraints

- Binary trees have at most two children per node
- Given any node of the tree, the values on the left must be strictly less than that node
- Given any node of the tree, the values on the right must be strictly greater than or equal to that node
- Given these constraints a binary tree is necessarily a sorted data structure
- The worst binary trees devolve into a linked list, the best are height balanced (think branching).

---

# PseudoCode For Insertion

- Create a new node
- Start at the root
  - Check if there is a root
    - If not the root becomes the new node
  - If there is a root check if the value of the new node is equal to, greater then, or less then the value of the root
    - If it is greater or equal to
      - Check to see if there is a node to the right
        - If there is, move to the new node and continue with the node to the right as the subtree root
        - If there is not, add the new node as the right property of the current node
    - If it is smaller
      - Check to see if there is a node to the left
        - If there is, move to the new node and continue with the node to the left as the subtree root
        - If there is not, add the new node as the left property of the current node

---

# PseudoCode For Search

- Start at the root
  - Check if there is a root
    - If not, there is nothing in the tree, so the search is over
  - If there is a root, check if the value of the root is equal to, greater then, or less then the value were looking for;
    - If it is equal to the value
      - We found what we are searching for
    - If it is less than the value
      - Check to see if there is a node to the left
        - If there isn't
          - the value isn't in our tree
        - If there is
          - repeat these steps with the node to the left as the new subtree root
    - If it is greater than the value
      - Check to see if there is a node to the right
        - If there isn't
          - the value isn't in our tree
        - If there is
          - repeat these steps with the node to the right as the new subtree root

---

# Example Binary Search Tree

```js
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

  recursiveInsert(val, currentNode = this.root) {
    if (!this.root) {
      this.root = new TreeNode(val);
      return this;
    }
    if (val < currentNode.val) {
      if (!currentNode.left) {
        currentNode.left = new TreeNode(val);
      } else {
        this.insert(val, currentNode.left);
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = new TreeNode(val);
      } else {
        this.insert(val, currentNode.right);
      }
    }
  }

  iterativeInsert(val, currentNode = this.root) {
    if (!this.root) {
      this.root = new TreeNode(val);
      return this;
    }
    if (val < currentNode.val) {
      if (!currentNode.left) {
        currentNode.left = new TreeNode();
      } else {
        while (true) {
          if (val < currentNode.val) {
            if (!currenNodet.left) {
              currentNode.left = new TreeNode();
              return this;
            } else {
              currentNode = currentNode.left;
            }
          } else {
            if (!currentNode.right) {
              currentNode.right = new TreeNode();
              return this;
            } else {
              currentNode = currentNode.right;
            }
          }
        }
      }
    }
  }

  searchRecur(val, currentNode = this.root) {
    if (!currentNode) return false;
    if (val < currentNode.val) {
      return this.searchRecur(val, currentNode.left);
    } else if (val > currentNode.val) {
      return this.searchRecur(val, currentNode.right);
    } else {
      return true;
    }
  }

  searchIter(val) {
    let currentNode = this.root;
    while (currentNode) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }

  // Maybe works, who knows, pulled it off the internet....

  deleteNodeHelper(root, key) {
    if (root === null) {
      return false;
    }
    if (key < root.val) {
      root.left = deleteNodeHelper(root.left, key);
      return root;
    } else if (key > root.val) {
      root.right = deleteNodeHelper(root.right, key);
      return root;
    } else {
      if (root.left === null && root.right === null) {
        root = null;
        return root;
      }
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      let currNode = root.right;
      while (currNode.left !== null) {
        currNode = currNode.left;
      }
      root.val = currNode.val;
      root.right = deleteNodeHelper(root.right, currNode.val);
      return root;
    }
  }

  //Types of Depth First Search

  preOrderTraversal(root) {
    if (!root) return [];
    let left = this.preOrderTraversal(root.left);
    let right = this.preOrderTraversal(root.right);
    return [root.val, ...left, ...right];
  }

  preOrderTraversalV2(root) {
    if (!root) return [];
    let newArray = new Array();
    newArray.push(root.val);
    newArray.push(...this.preOrderTraversalV2(root.left));
    newArray.push(...this.preOrderTraversalV2(root.right));
    return newArray;
  }

  inOrderTraversal(root) {
    if (!root) return [];
    let left = this.inOrderTraversal(root.left);
    let right = this.inOrderTraversal(root.right);
    return [...left, root.val, ...right];
  }

  inOrderTraversalV2(root) {
    if (!root) return [];
    let newArray = new Array();
    newArray.push(...this.inOrderTraversalV2(root.left));
    newArray.push(root.val);
    newArray.push(...this.inOrderTraversalV2(root.right));
    return newArray;
  }

  postOrderTraversal(root) {
    if (!root) return [];
    let left = this.postOrderTraversal(root.left);
    let right = this.postOrderTraversal(root.right);
    return [...left, ...right, root.val];
  }

  postOrderTraversalV2(root) {
    if (!root) return [];
    let newArray = new Array();
    newArray.push(...this.postOrderTraversalV2(root.left));
    newArray.push(...this.postOrderTraversalV2(root.right));
    newArray.push(root.val);
    return newArray;
  }

  //Breadth First Search

  breadthFirstSearch(root) {
    let queue = [root];
    let result = [];
    while (queue.length) {
      let current = queue.shift();
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.left);
      current.push(result);
    }
    return result;
  }
}
```
