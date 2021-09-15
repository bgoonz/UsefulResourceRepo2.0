//! A binary Heap is a type of binary tree. ... 

//-however it is not a binary search tree. 
//------>a binary search tree is fully ordered!

//!  A heap is a partially ordered Data Structure where:
//!  ----->the root of the tree will be the maximum (max heap) or the minimum (min heap)

//max-heap.png

//!  "best case" binary tree:  ---> ensure our heap has minimal height --> (it must be a balanced tree!)
//--------> every complete tree is also a balanced tree...
//**********    ------------------> BUT not every balanced tree is a complete tree!!

//! A Complete Tree is:
//* 1.)     a tree where all levels have the maximal number of nodes...except the bottom the level
//* 2.)     AND the bottom level has all nodes filled as far left as possible

//balenced-but-incomplete-tree.png

//! When to Use Heaps?

//-useful when attacking problems that require you to ___"partially sort" ___data
//------>takes form in problems that have us calculate the largest or smallest___ 'n'  ___numbers of a collection

//! if you were asked to find the largest 5 numbers in an array in linear time, O(n)
