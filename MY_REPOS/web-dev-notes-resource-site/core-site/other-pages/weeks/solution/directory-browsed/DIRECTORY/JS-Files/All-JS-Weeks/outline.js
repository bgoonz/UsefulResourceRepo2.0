class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
//Constructing a tree is a matter of creating the nodes and setting left and right
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
tree.png;

/*
! Visual representation of tree

                                        (a)
                                      /    \
                                    (b)    (c)
                                   /    \     \
                                 (d)   (e)     (f)
                                                
-you can assume that the top node is the root and the direction of edges points downward

-node A is the Root. 
Node A can access node B through a.left, but Node B cannot access Node A
-   Basic Tree Terminology
‣tree - graph with no cycles
‣binary tree - tree where nodes have at most 2 nodes
‣root - the ultimate parent, the single node of a tree that can access every other node through edges;
by definition the root will not have a parentinternal node - a node that has children
‣leaf - a node that does not have any childrenpath - a series of nodes that can be traveled through edges 
- for example A, B, E is a path through the above tree    

trees may be traversed in multiple ways.

may be traversed in depth-first or breadth-first order. 
There are three common ways to traverse them in depth-first
order: in-order, pre-order and post-order.

!Breadth-first search


Trees can also be traversed level-by-level, where you visit every node on a level before going to a lower level. 
This search is referred to as breadth-first search (BFS), as the search tree is broadened as much as possible on each depth before going to the next depth.

red dot and yields F, B, A, D, C, E, G, I, H. The algorithm is as follows and is
"pre-order" because you access the value of the node before recursively
descending.

Access the data of the current node
Recursively visit the left sub tree
Recursively visit the right sub tree


In-order traversal
In the above image, the in-order is noted by when the dotted line touches the
yellow dot and yields A, B, C, D, E, F, G, H, I. The algorithm is as follows and
is "in-order" because you access the value of the node after descending to the
left but before descending to the right.

Recursively visit the left sub tree
Access the data of the current node
Recursively visit the right sub tree
Post-order traversal
In the above image, the post-order is noted by when the dotted line touches the
green dot and yields A, C, E, D, B, H, I, G, F. The algorithm is as follows and
is "post-order" because you access the value of the node after descending to
both branches.

Recursively visit the left sub tree
Recursively visit the right sub tree
Access the data of the current node


In-order traversal
In the above image, the in-order is noted by when the dotted line touches the
yellow dot and yields A, B, C, D, E, F, G, H, I. The algorithm is as follows and
is "in-order" because you access the value of the node after descending to the
left but before descending to the right.

Recursively visit the left sub tree
Access the data of the current node
Recursively visit the right sub tree
Post-order traversal
In the above image, the post-order is noted by when the dotted line touches the
green dot and yields A, C, E, D, B, H, I, G, F. The algorithm is as follows and
is "post-order" because you access the value of the node after descending to
both branches.

Recursively visit the left sub tree
Recursively visit the right sub tree
Access the data of the current node


![](i.png)




*/
