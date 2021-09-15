/*
  Basic Tree Terminology
1 tree - graph with no cycles
2 binary tree - tree where nodes have at most 2 nodes
3 root - the ultimate parent, the single node of a tree that can access every other node through edges; by definition the root will not have a parent
4 internal node - a node that has children
5 leaf - a node that does not have any children
6 path - a series of nodes that can be traveled through edges - for example A, B, E is a path through the above tree

Breadth-first search
Trees can also be traversed level-by-level, where you visit every node on a level before going to a lower level.
 This search is referred to as breadth-first search (BFS), 
 as the search tree is broadened as much as possible on each depth before going to the next depth.
 
 
 These searches are referred to as depth-first search (DFS), since the search tree is deepened as much as possible on each child before going to the next sibling.
 
 breadth-first-traversal.png
 
 depth-first-traversal.png
 
 
 
 /*
                                                                                        (f)
                                                                     (#FF0000)       (#FFFF00)      (#00FF00)
                                                                                                  
                                                                            (b)
                                                            (#FF0000)                 (#00FF00)
                                                                        (#FFFF00)     
                                
 
 */
    
 function inOrderArray(root) {
  // if the root is null, return an empty array

  if(root === null) return [];
  // get the array for visiting the left node
  // get the array for visiting the right node

  const leftBranch = inOrderArray(root.left);
  const rightBranch = inOrderArray(root.right);
  // return the left array concatenated with the root value
  //   concatenated with the right array
  return leftBranch.concat(root.val).concat(rightBranch);
}

function postOrderArray(root) {
  // if the root is null, return an empty array

  if (root === null) return [];
  // get the array for visiting the left node
  // get the array for visiting the right node

  const leftBranch = postOrderArray(root.left);
  const rightBranch = postOrderArray(root.right);
  // return the left array concatenated with the right array
  //   concatenated with the root value
  return leftBranch.concat(rightBranch).concat(root.val);

}
 
 
 
 
 
 
 
 
 Pre-order traversal
In the above image, the pre-order is noted by when the dotted line touches the red dot and yields F, B, A, D, C, E, G, I, H. The algorithm is as follows and is "pre-order" because you access the value of the node before recursively descending.

Access the data of the current node
Recursively visit the left sub tree
Recursively visit the right sub tree


In-order traversal
In the above image, the in-order is noted by when the dotted line touches the yellow dot and yields A, B, C, D, E, F, G, H, I. The algorithm is as follows and is "in-order" because you access the value of the node after descending to the left but before descending to the right.

Recursively visit the left sub tree
Access the data of the current node
Recursively visit the right sub tree


Post-order traversal
In the above image, the post-order is noted by when the dotted line touches the green dot and yields A, C, E, D, B, H, I, G, F. The algorithm is as follows and is "post-order" because you access the value of the node after descending to both branches.

Recursively visit the left sub tree
Recursively visit the right sub tree
Access the data of the current node 
*/

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
