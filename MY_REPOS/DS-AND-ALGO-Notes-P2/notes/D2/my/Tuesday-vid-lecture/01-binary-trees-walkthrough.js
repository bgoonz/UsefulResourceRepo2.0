/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------(background)------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/*
! Terms

- tree - graph with no cycles
- binary tree - tree where nodes have at most 2 nodes
- root - the ultimate parent, the single node of a tree that can access every other node through edges; by definition the root will not have a parent
- internal node - a node that has children
- leaf - a node that does not have any children
- path - a series of nodes that can be traveled through edges - for example A, B, E is a path through the above tree

<------------------------------------------------------------------------------------------------------------------------------------------------------>

! Search Patterns

- Breadth First Search - Check all nodes at a level before moving down a level
- Depth First Search - Check the depth as far as it goes for one child, before
moving on to the next child.
- Pre-Order Traversal - Access the data of the current node, recursively visit the left sub tree, recursively visit the right sub tree
- In-Order Traversal - Recursively visit the left sub tree, access the data of the current node, recursively visit the right sub tree
- Post-Order Traversal - Recursively visit the left sub tree, recursively visit the right sub tree, access the data of the current node.

<------------------------------------------------------------------------------------------------------------------------------------------------------>

! Constraints

- Binary trees have at most two children per node
- Given any node of the tree, the values on the left must be strictly less than that node
- Given any node of the tree, the values on the right must be strictly greater than or equal to that node
- Given these constraints a binary tree is necessarily a sorted data structure
- The worst binary trees devolve into a linked list, the best are height balanced (think branching).

binary-tree.png

*/

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------(tree-data-structure)------------------------------------------------------------------ */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/*
  -binary tree is a special case of a graph
  -a graph is just a combination of nodes and interconnections (edges) between them
  -A cycle is a path along the directed edges from a node back to itself. 
! Trees cannot posess a cycle 
tree-vs-graph-w-cycle.png
*/

/*
!  ⬇️ 
!  ⬇️  _________  ___  ___  ___  ________           ___  ________           ________          _________  ________  _______   _______
!  ⬇️ |\___   ___\\  \|\  \|\  \|\   ____\         |\  \|\   ____\         |\   __  \        |\___   ___\\   __  \|\  ___ \ |\  ___ \
!  ⬇️ \|___ \  \_\ \  \\\  \ \  \ \  \___|_        \ \  \ \  \___|_        \ \  \|\  \       \|___ \  \_\ \  \|\  \ \   __/|\ \   __/|
!  ⬇️      \ \  \ \ \   __  \ \  \ \_____  \        \ \  \ \_____  \        \ \   __  \           \ \  \ \ \   _  _\ \  \_|/_\ \  \_|/__
!  ⬇️       \ \  \ \ \  \ \  \ \  \|____|\  \        \ \  \|____|\  \        \ \  \ \  \           \ \  \ \ \  \\  \\ \  \_|\ \ \  \_|\ \
!  ⬇️        \ \__\ \ \__\ \__\ \__\____\_\  \        \ \__\____\_\  \        \ \__\ \__\           \ \__\ \ \__\\ _\\ \_______\ \_______\
!  ⬇️         \|__|  \|__|\|__|\|__|\_________\        \|__|\_________\        \|__|\|__|            \|__|  \|__|\|__|\|_______|\|_______|
!  ⬇️                              \|_________|            \|_________|
                                                - it looks like a linked list ====>  (because it is)
  ()
    ⇲
     ()
       ⇲
        ()
          ⇲
           ()
             ⇲
              ()
*/

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------(Binary Tree)------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */

/*
                            Ⓐ 
                           ╱  ╲
                          Ⓑ   Ⓒ
                         ╱  ╲   ╲        
                        Ⓓ   Ⓔ   Ⓕ

*/
//binary-tree.png
// a.left = b;
// a.right = c;
// b.left = d;
// b.right = e;
// c.right = f;

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------(Tree-Node)--------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
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

/*
  a:  TreeNode { val: 'a', left: null, right: null }
b:  TreeNode { val: 'b', left: null, right: null }
c:  TreeNode { val: 'c', left: null, right: null }
d:  TreeNode { val: 'd', left: null, right: null }
e:  TreeNode { val: 'e', left: null, right: null }
f:  TreeNode { val: 'f', left: null, right: null }
*/

//right they are not connected

//to get '
/*
                            Ⓐ 
                           ╱  ╲
                          Ⓑ   Ⓒ
                         ╱  ╲   ╲        
                        Ⓓ   Ⓔ   Ⓕ

*/

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

/*
  a:  TreeNode {
  val: 'a',
  left:
   TreeNode {
     val: 'b',
     left: TreeNode { val: 'd', left: null, right: null },
     right: TreeNode { val: 'e', left: null, right: null } },
  right:
   TreeNode {
     val: 'c',
     left: null,
     right: TreeNode { val: 'f', left: null, right: null } } }
b:  TreeNode {
  val: 'b',
  left: TreeNode { val: 'd', left: null, right: null },
  right: TreeNode { val: 'e', left: null, right: null } }
c:  TreeNode {
  val: 'c',
  left: null,
  right: TreeNode { val: 'f', left: null, right: null } }
d:  TreeNode { val: 'd', left: null, right: null }
e:  TreeNode { val: 'e', left: null, right: null }
f:  TreeNode { val: 'f', left: null, right: null }
*/

//-----------------------------------------------------------
console.log("a: ", a);
console.log("b: ", b);
console.log("c: ", c);
console.log("d: ", d);
console.log("e: ", e);
console.log("f: ", f);
/*
!   ~ aux-materials : (master) node example-bt.js 
a:  TreeNode { val: 'a', left: null, right: null }
b:  TreeNode { val: 'b', left: null, right: null }
c:  TreeNode { val: 'c', left: null, right: null }
d:  TreeNode { val: 'd', left: null, right: null }
e:  TreeNode { val: 'e', left: null, right: null }
f:  TreeNode { val: 'f', left: null, right: null }
*/
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------(B-S-Tree)---------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */
// class BST {
//     constructor() {
//         this.root = null;
//     }
//     insert(val, root = this.root) {
//         // if root doesn't exist create it
//         if (!this.root) {
//             this.root = new TreeNode(val);
//             return;
//         }
//         // if val is less than root.val, create node, & insert @ root.left if root.left DNE
//         if (val < root.val) {
//             if (!root.left) {
//                 root.left = new TreeNode(val);
//             } else {
//                 this.insert(val, root.left);
//             }
//         } else {
//             // if val is more than root.val, create node & insert @ root.right if it DNE
//             if (!root.right) {
//                 root.right = new TreeNode(val);
//             } else {
//                 this.insert(val, root.right);
//             }
//         }
//     }
//     searchRecur(val, root = this.root) {
//         if (!root) return false;
//         // ! search left root if val < root.val or right root if val > root val
//         // recurse using the that searched node as a root
//         if (val < root.val) {
//             return this.searchRecur(val, root.left);
//         } else if (val > root.val) {
//             return this.searchRecur(val, root.right);
//         } else {
//             // if it isnt < or > its === so return true
//             return true;
//         }
//     }
//     searchIter(val) {
//         // define temp as the holder of node searched
//         let temp = this.root;
//         // will BO when temp.right or temp.left is null for the node ie it is the leaf of the tree
//         while (temp !== null) {
//             if (val < temp.val) {
//                 temp = temp.left;
//             } else if (val > temp.val) {
//                 temp = temp.right;
//                 // if it isnt < or > its === so return true
//             } else {
//                 return true;
//             }
//         }
//         return false;
//     }
// }
// let tree = new BST();
// //tree.insert(10);
// console.log("tree.insert(10): ", tree.insert(10));
// console.log("<----(after 10:)-----> tree: ", "\n", tree);
// //tree.insert(5);
// console.log("tree.insert(5): ", tree.insert(5));
// console.log("<----(after 5:)-----> tree: ", "\n", tree);
// //tree.insert(16);
// console.log("tree.insert(16): ", tree.insert(16));
// console.log("<----(after 16:)-----> tree: ", "\n", tree);
// //tree.insert(1);
// console.log("tree.insert(1): ", tree.insert(1));
// console.log("<----(after 1:)-----> tree: ", "\n", tree);
// //tree.insert(7);
// console.log("tree.insert(7): ", tree.insert(7));
// console.log("<----(after 7:)-----> tree: ", "\n", tree);
// //tree.insert(16);
// console.log("tree.insert(16): ", tree.insert(16));
// console.log("<----(after 16-end:)-----> tree: ", "\n", tree);
// console.log(
//     "<----(FINAL, Numbers: 10 , 5 , 16 , 1 , 7 , 16 )-----> tree: ",
//     "\n",
//     tree
// );
// console.log(
//     "<====================<====================(End OF Tree-Beginning of Tree1)====================>====================>"
// );
// let tree1 = new BST();
// console.log("tree1.insert('Ⓐ'): ", tree1.insert("Ⓐ"));
// console.log("<----(after A:)-----> tree1: ", "\n", tree1);
// console.log("tree1.insert('Ⓑ'): ", tree1.insert("Ⓑ"));
// console.log("<----(after B:)-----> tree1: ", "\n", tree1);
// console.log("tree1.insert('Ⓒ'): ", tree1.insert("Ⓒ"));
// console.log("<----(after C:)-----> tree1: ", "\n", tree1);
// console.log("tree1.insert('Ⓓ'): ", tree1.insert("Ⓓ"));
// console.log("<----(afterD:)-----> tree1: ", "\n", tree1);
// console.log("tree1.insert('Ⓔ'): ", tree1.insert("Ⓔ"));
// console.log("<----(after E:)-----> tree1: ", "\n", tree1);
// console.log("tree1.insert('Ⓕ'): ", tree1.insert("Ⓕ"));
// console.log("<----(after F:)-----> tree1: ", "\n", tree1);
// console.log("<----(FINAL-LETTERS Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ)-----> tree1: ", "\n", tree1);
