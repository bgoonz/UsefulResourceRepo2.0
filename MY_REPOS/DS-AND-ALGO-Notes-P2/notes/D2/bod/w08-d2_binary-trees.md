# WEEK-08 DAY-2<br>*Binary Trees* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->
________________________________________________________________________________
________________________________________________________________________________
# Binary Trees and Binary Search Trees

**The objective of this lesson** is for you to become comfortable with
implementing common data structures. This is important because questions about
data structures are incredibly likely to be interview questions for software
engineers from junior to senior levels. Moreover, understanding how different
data structures work will influence the libraries and frameworks that you choose
when writing software.

When you are done, you will be able to:

1. Explain and implement a Binary Tree.
2. Identify the three types of tree traversals: pre-order, in-order, and
   post-order.
3. Explain and implement a Binary Search Tree.you to become comfortable with
implementing common data structures. This is important because questions about
data structures are incredibly likely to be interview questions for software
engineers from junior to senior levels. Moreover, understanding how different
data structures work will influence the libraries and frameworks that you choose
when writing software.

When you are done, you will be able to:

1. Explain and implement a Binary Tree.
2. Identify the three types of tree traversals: pre-order, in-order, and
   post-order.
3. Explain and implement a Binary Search Tree.

________________________________________________________________________________
# Binary Trees

Binary Trees are perhaps the most pervasive data structure in computer science.
Let's take a moment to go over the basic characteristics of a Binary Tree before
we explore algorithms that utilize this structure.

### What is a Graph?

Before we define what a **Tree** is, we must first understand the definition of
a **Graph**. A graph is a collection of **nodes** and any **edges** between
those nodes. You've likely seen depictions of graphs before, they usually exist
as circles (nodes) and arrows (edges) between those circles. Below are few
examples of graphs:

![graphs](images/graphs.png)

For now, you can ignore the blue coloring. Notice how the graphs above vary
greatly in their structure. A graph is indeed a very broad, overarching
category. In fact, linked lists and trees are both considered subclasses of
graphs. We'll cover algorithms that operate on a general graph structure later,
but for now we want to focus on what graphs are trees and what graphs are not.
It's worth mentioning that a single node with no edges (image 1) is considered a
graph. The empty graph (a graph with 0 nodes and 0 edges, not pictured :)) is
also still a graph. This line of thinking will help us later when we design
graph algorithms.

### What is a Tree?

A **Tree** is a **Graph** that does not contain any cycles. A cycle is is
defined as a path through edges that begins and ends at the same node. This
seems straightforward, but the definition becomes a bit muddled as
Mathematicians and Computer Scientists use the term "tree" in slightly different
ways. Lets break it down:

+  To a Mathematician, graphs 1, 2, 3, and 4 in the above image are trees.
+  To a Computer Scientist, only graphs 1 ,2, and 3 are trees.

Well, at least both camps agree that graph 5 is most certainly not a tree! This
is because of the obvious cycle that spans all three nodes. However, why is
there disagreement over graph 4? The reason is this: In computer science, we use
to the term "tree" to really refer to a "rooted tree." A "rooted tree" is a
"tree" where there exists a special node from which every other node is
accessible; we call this special node the "root".  Think of the root as ultimate
ancestor, the single node that all other nodes inherit from. Above we have
colored all roots in blue. Like you'd probably suspect, in this course we'll
subscribe to the Computer Scientist's interpretation. That is, we won't consider
graph 4 a tree because there is no such root we can label.

You've probably heard the term "root" throughout your software engineering
career: root directory, root user, etc.. All of these concepts branch† from the
humble tree data structure!

### What is a Binary Tree?

A **Binary Tree** is a **Tree** where nodes have **at most 2 children**. This
means graphs 1, 2, and 3 are all Binary Trees. There exist ternary trees (at
most 3 children) and n-ary trees (at most n children), but you'll likely
encounter binary trees in your job hunt, so we'll focus on them in this course.
Based on our final definition for a binary tree, here is some food for thought:

+ an empty graph of 0 nodes and 0 edges is a binary tree
+ a graph of 1 node and 0 edges is a binary tree
+ a linked list is a binary tree

Take a moment to use the definitions we explored to verify that each of the
three statements above is true. We bring up these three scenarios in particular
because they are the simplest types of Binary Trees. We want to eventually build
elegant algorithms and these simple scenarios will fuel our design.

### Representing a Binary Tree with Node Instances

Let's explore a common way to represent binary trees using some object oriented
design. A tree is a collection of nodes, so let's implement a `TreeNode` class.
We'll use properties of `left` and `right` to reference the children of a
`TreeNode`. That is, `left` and `right` will reference other `TreeNode`s:

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
```

Constructing a tree is a matter of creating the nodes and setting `left` and
`right` however we please. For example:

```javascript
let a = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
```

The visual representation of the tree is:

![graph_a](images/graph_a.png)

To simplify our diagrams, we'll omit the arrowheads on the edges. Moving forward
you can assume that the top node is the root and the direction of edges points
downward. In other words, node A is the Root. Node A can access node B through
`a.left`, but Node B cannot access Node A.

We now have a data structure we can use to explore Binary Tree algorithms!
Creating a tree in this way may be tedious and repetitive, however it allows us
to decide exactly what nodes are connected and in what direction. This is will
be useful as we account for edge cases in our design.

### Basic Tree Terminology

+ tree - graph with no cycles
+ binary tree - tree where nodes have at most 2 nodes
+ root - the ultimate parent, the single node of a tree that can access every
  other node through edges; by definition the root will not have a parent
+ internal node - a node that has children
+ leaf - a node that does not have any children
+ path - a series of nodes that can be traveled through edges - for example A,
  B, E is a path through the above tree

† Pun Intended

## Traversing trees

Unlike linked lists, arrays and other linear data structures, which are usually
traversed in linear order from front to back or back to front, trees may be
traversed in multiple ways. They may be traversed in depth-first or
breadth-first order. There are three common ways to traverse them in depth-first
order: in-order, pre-order and post-order.

### Breadth-first search

Trees can also be traversed level-by-level, where you visit every node on a
level before going to a lower level. This search is referred to as breadth-first
search (BFS), as the search tree is broadened as much as possible on each depth
before going to the next depth.

![breadth-first tree traversal](images/File:Sorted_binary_tree_breadth-first_traversal.svg)

### Depth-first searches

These searches are referred to as depth-first search (DFS), since the search
tree is deepened as much as possible on each child before going to the next
sibling.

![depth-first tree traversal](images/Sorted_binary_tree_ALL.svg)

#### Pre-order traversal

In the above image, the pre-order is noted by when the dotted line touches the
red dot and yields F, B, A, D, C, E, G, I, H. The algorithm is as follows and is
"pre-order" because you access the value of the node before recursively
descending.

* Access the data of the current node
* Recursively visit the left sub tree
* Recursively visit the right sub tree

#### In-order traversal

In the above image, the in-order is noted by when the dotted line touches the
yellow dot and yields A, B, C, D, E, F, G, H, I. The algorithm is as follows and
is "in-order" because you access the value of the node after descending to the
left but before descending to the right.

* Recursively visit the left sub tree
* Access the data of the current node
* Recursively visit the right sub tree

#### Post-order traversal

In the above image, the post-order is noted by when the dotted line touches the
green dot and yields A, C, E, D, B, H, I, G, F. The algorithm is as follows and
is "post-order" because you access the value of the node after descending to
both branches.

* Recursively visit the left sub tree
* Recursively visit the right sub tree
* Access the data of the current node

________________________________________________________________________________
# Binary Search Trees

Now that we have a solid grasp of **Binary Trees**, let's add another constraint
to the data structure. A Binary **Search** Tree (BST) has an additional criteria
where:

+ given any node of the tree, the values in the left subtree must all be
  strictly less than the given node's value.
+ and the values in the right subtree must all be greater than or equal to the
  given node's value

### BST Definition

We can also describe a BST using a recursive definition. A **Binary Tree** is a
**Binary Search Tree** if:

+ the left subtree contains values less than the root
+ AND the right subtree contains values greater than or equal to the root
+ AND the left subtree is a Binary Search Tree
+ AND the right subtree is a Binary Search Tree

It's worth mentioning that the empty tree (a tree with 0 nodes) is indeed a BST
(did someone say base case?).

Here are a few examples of BSTs:

![bsts](images/bsts.png)

Take a moment to verify that the above binary trees are BSTs. Note that image 2
has the same chain structure as a linked list. This will come into play later.

Below is an example of a binary tree that is **not** a search tree because a
left child (35) is greater than it's parent (23):

![not_bst](images/not_bst.png)

### A BST is a Sorted Data Structure

So what's the big deal with BSTs? Well, because of the properties of a BST, we
can consider the tree as having an order to the values. That means the values
are fully sorted! By looking at the three BST examples above, you are probably
not convinced of things being sorted. This is because the ordering is encoded by
an in-order traversal. Let's recall our previous `inOrderPrint` function:

```javascript
function inOrderPrint(root) {
  if (!root) return;

  inOrderPrint(root.left);
  console.log(root.val);
  inOrderPrint(root.right);
}
```

If we run `inOrderPrint` on the three BSTs, we will get the following output:

```
BST 1: 42
BST 2: 4, 5, 6
BST 3: 1, 5, 7, 10, 16, 16
```

For each tree, we printed out values in increasing order! A binary search tree
contains sorted data; this will come into play when we perform algorithms on
this data structure.

Once you create a binary search tree class `BST`, you can call `insert` to build
up the `BST` without worrying about breaking the search tree property. Here are
two different trees built with the `BST` class that you'll write.

```javascript
let tree1 = new BST();
tree1.insert(10);
tree1.insert(5);
tree1.insert(16);
tree1.insert(1);
tree1.insert(7);
tree1.insert(16);

let tree2 = new BST();
tree2.insert(1);
tree2.insert(5);
tree2.insert(7);
tree2.insert(10);
tree2.insert(16);
tree2.insert(16);
```

The insertions above will yield the following trees:

![good_bad_bst](images/good_bad_bst.png)

Are you cringing at `tree2`? You should be. Although we have the same values in
both trees, they display drastically different structures because of the
insertion order we used. This is why we have been referring to our `BST`
implementation as **naive**. Both of these trees are Binary Search Trees,
however not all BSTs are created equal. A worst case BST degenerates into a
linked list. The "best" BSTs are **height balanced**, we'll explore this concept
soon™.

## A special traversal case

In a binary search tree, in-order traversal retrieves the keys in **ascending
sorted order**. Please review the image that you saw before about tree traversal.

![depth-first tree traversal](images/Sorted_binary_tree_ALL.svg)

Note that the in-order sort represented by where the dotted line touches the
yellow dots results in node visiting in the order A, B, C, D, E, F, G, H, I.
In-order traversal _always_ visits the nodes in sequential order in a binary
search tree.

________________________________________________________________________________
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

________________________________________________________________________________
# Binary Search Tree Project

This project contains a skeleton for you to implement a binary search tree. This
is a test-driven project. Run the tests and read the top-most error. If it's not
clear what is failing, open the **test/test.js** file to figure out what the
test is expecting. Make the top-most test pass.

Keep making the top-most test pass until all tests pass.

## Instructions

* Clone the project from
  https://github.com/appacademy-starters/data-structures-binary-search-tree-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `test/test.js`. Your job is to write code in
  * **lib/bst.js** to implement the `BST` class
  * **BONUS: lib/leet_code_108.js** as a scratch pad to work on the LeetCode.com
    problem at https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
  * **BONUS: lib/leet_code_110.js** as a scratch pad to work on the LeetCode.com
    problem at https://leetcode.com/problems/balanced-binary-tree/
