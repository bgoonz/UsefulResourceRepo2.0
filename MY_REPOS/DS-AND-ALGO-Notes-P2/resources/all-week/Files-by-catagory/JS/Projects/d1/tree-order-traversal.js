/* ---------------------------------------------------------------------(background)------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/*
! Terms
- tree - graph with no cycles
/\
- binary tree - tree where nodes have at most 2 nodes
/\
- root - the ultimate parent,
-----> the single node of a tree that can access every other node through edges; 
---------->by definition the root will not have a parent
/\
- internal node - a node that has children
/\
- leaf - a node that does not have any children
/\
- path - a series of nodes that can be traveled through edges 
-----> for example A, B, E is a path through the above tree
/*
                            Ⓐ 
                           ╱  ╲
                          Ⓑ   Ⓒ
                         ╱  ╲   ╲        
                        Ⓓ   Ⓔ   Ⓕ
*/
/*
<------------------------------------------------------------------------------------------------------------------------------------------------------>
! Constraints
- Binary trees have at most two children per node
! Given any node of the tree, the values on the left must be strictly less than that node
/\
- Given any node of the tree, the values on the right must be strictly greater than or equal to that node
/\
- Given these constraints a binary tree is necessarily a sorted data structure
/\
- The worst binary trees devolve into a linked list, the best are height balanced (think branching).
binary-tree.png
*/
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------(traversal)------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/*
                            Ⓐ 
                           ╱  ╲
                          Ⓑ   Ⓒ
                         ╱  ╲   ╲        
                        Ⓓ   Ⓔ   Ⓕ
*/
/*
! Search Patterns
- 1.)   Breadth First Search - Check all nodes at a level before moving down a level
/\
- 2.)   Depth First Search - Check the depth as far as it goes for one child, before moving on to the next child.
/\
- 3.)   Pre-Order Traversal - Access the data of the current node, recursively visit the left sub tree, recursively visit the right sub tree
/\
- 4.)   In-Order Traversal - Recursively visit the left sub tree, access the data of the current node, recursively visit the right sub tree

/\
- 5.)   Post-Order Traversal - Recursively visit the left sub tree, recursively visit the right sub tree, access the data of the current node.
/\
*/
