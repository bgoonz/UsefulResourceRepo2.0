things to note:
---------------

-   linked lists and trees are both considered subclasses of graphs.

Here's a Binary Search Tree (BST). Every circle is called a node and
each node can be connected to 2 other nodes -- one on the left and
right. That's why they're called Binary Trees, they have 2 "child" nodes
and it looks like a tree!

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--tVm8AAUD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/4t1sycs1xsvt4qqs1m57.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--tVm8AAUD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/4t1sycs1xsvt4qqs1m57.png)

The left child node is always smaller or equal in value than the parent,
and the right is always greater or equal. Some implementations allow
only the left or right node to be equal to the parent.

The default values for the left and right tree are null/None and default
val is 0.

[](#in-order)In Order
---------------------

This method moves through the tree "in order". Meaning that it will
print every node's value in order from smallest to greatest.

Using recursion, the function will call itself on the left sub-tree,
then print the current value, and then call itself on the right
sub-tree.  
 The result is that it prints the tree's values.... in order.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--zaYuwulZ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/w0z2pz1f7th1k0ut8rbr.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--zaYuwulZ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/w0z2pz1f7th1k0ut8rbr.gif)

Depth-First Search is the classic traversal method for trees and also
graphs. This method is also known as the pre-order traversal because it
first operates on the current node, then the left and right child nodes.

Depth first search is very popular for general traversal as well as
making copies of the tree.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--jhfHLfge--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/qpsgkhgccjrjn9ybxb6l.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--jhfHLfge--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/qpsgkhgccjrjn9ybxb6l.gif)

The last of the traversal triplets. It first operates on the left and
right child nodes then the current node.

Post Order is very useful for deleting a tree, as it goes from the
bottom up.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--UFh1HPf7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/zv1x6vo9p8cqopqzod0n.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--UFh1HPf7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/zv1x6vo9p8cqopqzod0n.gif)

This one is a little more tricky and can only be done using a queue. It
might be possible with recursion but it's easier to understand
iteratively. It uses a queue when traversing so it goes through the tree
as nodes are added to it. As a result, it goes through the tree, level
by level. This makes breadth-first search a popular search algorithm in
graphs as well.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--Lng93Nkl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/eijg2o9eo8xtqk40q91d.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Lng93Nkl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/eijg2o9eo8xtqk40q91d.png)
