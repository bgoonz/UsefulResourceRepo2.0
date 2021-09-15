# Difference between Binary Tree and Binary Search Tree - GeeksforGeeks

> A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions.

**Binary Tree Data Structure**

A tree whose elements have at most 2 children is called a binary tree. Since each element in a binary tree can have only 2 children, we typically name them the left and right child.

[![](https://www.geeksforgeeks.org/wp-content/uploads/binary-tree-to-DLL.png "Click to enlarge")](https://www.geeksforgeeks.org/wp-content/uploads/binary-tree-to-DLL.png)

**Binary Search Tree Data Structure**

Binary Search Tree is a node-based binary tree data structure which has the following properties:

  
  

*   The left subtree of a node contains only nodes with keys lesser than the node’s key.
*   The right subtree of a node contains only nodes with keys greater than the node’s key.
*   The left and right subtree each must also be a binary search tree.
*   There must be no duplicate nodes.

[![](https://media.geeksforgeeks.org/wp-content/uploads/BSTSearch.png "Click to enlarge")](https://media.geeksforgeeks.org/wp-content/uploads/BSTSearch.png)

**Difference between Binary Tree and Binary Search Tree:**

| BINARY TREE | BINARY SEARCH TREE |
| --- | --- |
| BINARY TREE is a non linear data structure where each node can have almost two child nodes | BINARY SEARCH TREE is a node based binary tree which further has right and left subtree that too are binary search tree. |
| BINARY TREE is unordered hence slower in process of insertion, deletion and searching. | Insertion, deletion, searching of an element is faster in BINARY SEARCH TREE than BINARY TREE due to the ordered characteristics |
| IN BINARY TREE there is no ordering in terms of how the nodes are arranged | IN BINARY SEARCH TREE the left subtree has elements less than the nodes element and the right subtree has elements greater than the nodes element. |

Attention reader! Don’t stop learning now. Get hold of all the important DSA concepts with the [**DSA Self Paced Course**](https://practice.geeksforgeeks.org/courses/dsa-self-paced?utm_source=geeksforgeeks&utm_medium=article&utm_campaign=gfg_article_dsa_content_bottom) at a student-friendly price and become industry ready.

* * *

* * *

If you like GeeksforGeeks and would like to contribute, you can also write an article using [contribute.geeksforgeeks.org](https://contribute.geeksforgeeks.org/) or mail your article to contribute@geeksforgeeks.org. See your article appearing on the GeeksforGeeks main page and help other Geeks.

Please Improve this article if you find anything incorrect by clicking on the "Improve Article" button below.

  

Writing code in comment? Please use [ide.geeksforgeeks.org](https://ide.geeksforgeeks.org/), generate link and share the link here.


[Source](https://www.geeksforgeeks.org/difference-between-binary-tree-and-binary-search-tree/)