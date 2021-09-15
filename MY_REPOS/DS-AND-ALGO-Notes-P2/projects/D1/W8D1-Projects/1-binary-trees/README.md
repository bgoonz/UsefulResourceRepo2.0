# Binary Tree Project

This project contains a skeleton for you to implement a binary tree. This is a
test-driven project. Run the tests and read the top-most error. If it's not
clear what is failing, open the **test/test.js** file to figure out what the
test is expecting. Make the top-most test pass.

Keep making the top-most test pass until all tests pass.

The algorithms for the traversal functions are in the files and are reproduced
here.

```
procedure in order array (node)
  parameter node: a tree node

  if the tree node is null, return an empty array

  // get the array for visiting the left node of node
  // get the array for visiting the right node of node

  // return the left array concatenated with the node value
  //   concatenated with the right array
end procedure in order array
```

```
procedure post order array (node)
  parameter node: a tree node

  if the tree node is null, return an empty array

  // get the array for visiting the left node of node
  // get the array for visiting the right node of node

  // return the left array concatenated with the right array
  //   concatenated with the node value
end procedure post order array
```


## Instructions

* Clone the project from
  https://github.com/appacademy-starters/data-structures-binary-tree-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `test/test.js`. Your job is to write code in
  * **lib/tree_node.js** to implement the `TreeNode` class
  * **lib/tree_order.js** to implement the `inOrderArray` and `postOrderArray`
    functions to traverse a tree
  * **BONUS: lib/leet_code_105.js** as a scratch pad to work on the LeetCode.com
    problem at https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
