# Binary Search Tree

Binary search tree is a node based binary tree data structure.

### Introduction

- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- If we goto the left as far as possible we will find the smalled node and if goto the right as far as possible than we will find the largest node.

Time Complexity : O(log N)

### Important Points

1. It keeps the keys in sorted order: so that lookup and other other operations can use the principle of binary search.
2. Each comparison allows the operations to skip over half of the tree, so that each lookup/insertion/deletion takes time proportional to the logarithm of the number of items stored in the tree.
3. This is much better than linear time O(N) required to find items by key in an unsorted array, but slower than the corresponding operations on hash tables.

Binary search tree have to be balanced to be efficient. Tree is balanced if the left subtree contains as many nodes as the right subtree. If the binary search tree is not balanced then the search will take more time as it will not ignore irrelevant values. That means that our search performance will be decreased compared with a balanced tree.

Popular algorithms to balance the tree are

1. AVL Tree
2. Red Black Trees

### Deletion

1. Node is a leaf node  
    Set the node to null
2. Node has a single child  
    Update the reference of parent of the node to child of the Node
3. Node has two child  
    We look for the largest item in the left subtree or the smallest item in the right subtree and swap with the Node.

### Traverse

1. In order Traverse  
    The left subtree is visited first, then the root and later the right sub-tree.
2. Pre order Traverse  
    The root node is visited first, then the left subtree and finally the right subtree.
3. Post order Traverse  
    The root node is visited last, hence the name. First we traverse the left subtree, then the right subtree and finally the root node.
