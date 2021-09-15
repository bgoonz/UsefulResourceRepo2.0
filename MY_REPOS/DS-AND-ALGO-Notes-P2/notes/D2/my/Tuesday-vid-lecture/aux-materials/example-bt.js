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
class BST {
    constructor() {
        this.root = null;
    }
    insert(val, root = this.root) {
        // if root doesn't exist create it
        if (!this.root) {
            this.root = new TreeNode(val);
            return;
        }
        // if val is less than root.val, create node, & insert @ root.left if root.left DNE
        if (val < root.val) {
            if (!root.left) {
                root.left = new TreeNode(val);
            } else {
                this.insert(val, root.left);
            }
        } else {
            // if val is more than root.val, create node & insert @ root.right if it DNE
            if (!root.right) {
                root.right = new TreeNode(val);
            } else {
                this.insert(val, root.right);
            }
        }
    }
    searchRecur(val, root = this.root) {
        if (!root) return false;
        // ! search left root if val < root.val or right root if val > root val
        // recurse using the that searched node as a root
        if (val < root.val) {
            return this.searchRecur(val, root.left);
        } else if (val > root.val) {
            return this.searchRecur(val, root.right);
        } else {
            // if it isnt < or > its === so return true
            return true;
        }
    }
    searchIter(val) {
        // define temp as the holder of node searched
        let temp = this.root;
        // will BO when temp.right or temp.left is null for the node ie it is the leaf of the tree
        while (temp !== null) {
            if (val < temp.val) {
                temp = temp.left;
            } else if (val > temp.val) {
                temp = temp.right;
                // if it isnt < or > its === so return true
            } else {
                return true;
            }
        }
        return false;
    }
}
let tree = new BST();
//tree.insert(10);
console.log("tree.insert(10): ", tree.insert(10));
console.log("<----(after 10:)-----> tree: ", "\n", tree);
//tree.insert(5);
console.log("tree.insert(5): ", tree.insert(5));
console.log("<----(after 5:)-----> tree: ", "\n", tree);
//tree.insert(16);
console.log("tree.insert(16): ", tree.insert(16));
console.log("<----(after 16:)-----> tree: ", "\n", tree);
//tree.insert(1);
console.log("tree.insert(1): ", tree.insert(1));
console.log("<----(after 1:)-----> tree: ", "\n", tree);
//tree.insert(7);
console.log("tree.insert(7): ", tree.insert(7));
console.log("<----(after 7:)-----> tree: ", "\n", tree);
//tree.insert(16);
console.log("tree.insert(16): ", tree.insert(16));
console.log("<----(after 16-end:)-----> tree: ", "\n", tree);
console.log(
    "<----(FINAL, Numbers: 10 , 5 , 16 , 1 , 7 , 16 )-----> tree: ",
    "\n",
    tree
);
console.log(
    "<====================<====================(End OF Tree-Beginning of Tree1)====================>====================>"
);
let tree1 = new BST();
console.log("tree1.insert('Ⓐ'): ", tree1.insert("Ⓐ"));
console.log("<----(after A:)-----> tree1: ", "\n", tree1);
console.log("tree1.insert('Ⓑ'): ", tree1.insert("Ⓑ"));
console.log("<----(after B:)-----> tree1: ", "\n", tree1);
console.log("tree1.insert('Ⓒ'): ", tree1.insert("Ⓒ"));
console.log("<----(after C:)-----> tree1: ", "\n", tree1);
console.log("tree1.insert('Ⓓ'): ", tree1.insert("Ⓓ"));
console.log("<----(afterD:)-----> tree1: ", "\n", tree1);
console.log("tree1.insert('Ⓔ'): ", tree1.insert("Ⓔ"));
console.log("<----(after E:)-----> tree1: ", "\n", tree1);
console.log("tree1.insert('Ⓕ'): ", tree1.insert("Ⓕ"));
console.log("<----(after F:)-----> tree1: ", "\n", tree1);
console.log("<----(FINAL-LETTERS Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ)-----> tree1: ", "\n", tree1);
/*
 ~ aux-materials : (master) node example-bt.js 
a:  TreeNode { val: 'a', left: null, right: null }
b:  TreeNode { val: 'b', left: null, right: null }
c:  TreeNode { val: 'c', left: null, right: null }
d:  TreeNode { val: 'd', left: null, right: null }
e:  TreeNode { val: 'e', left: null, right: null }
f:  TreeNode { val: 'f', left: null, right: null }
tree.insert(10):  undefined
<----(after 10:)-----> tree:
 BST { root: TreeNode { val: 10, left: null, right: null } }
tree.insert(5):  undefined
<----(after 5:)-----> tree:
 BST {
  root:
   TreeNode {
     val: 10,
     left: TreeNode { val: 5, left: null, right: null },
     right: null } }
tree.insert(16):  undefined
<----(after 16:)-----> tree:
 BST {
  root:
   TreeNode {
     val: 10,
     left: TreeNode { val: 5, left: null, right: null },
     right: TreeNode { val: 16, left: null, right: null } } }
tree.insert(1):  undefined
<----(after 1:)-----> tree:
 BST {
  root:
   TreeNode {
     val: 10,
     left: TreeNode { val: 5, left: [TreeNode], right: null },
     right: TreeNode { val: 16, left: null, right: null } } }
tree.insert(7):  undefined
<----(after 7:)-----> tree:
 BST {
  root:
   TreeNode {
     val: 10,
     left: TreeNode { val: 5, left: [TreeNode], right: [TreeNode] },
     right: TreeNode { val: 16, left: null, right: null } } }
tree.insert(16):  undefined
<----(after 16-end:)-----> tree:
 BST {
  root:
   TreeNode {
     val: 10,
     left: TreeNode { val: 5, left: [TreeNode], right: [TreeNode] },
     right: TreeNode { val: 16, left: null, right: [TreeNode] } } }
<----(FINAL, Numbers: 10 , 5 , 16 , 1 , 7 , 16 )-----> tree:  
 BST {
  root:
   TreeNode {
     val: 10,
     left: TreeNode { val: 5, left: [TreeNode], right: [TreeNode] },
     right: TreeNode { val: 16, left: null, right: [TreeNode] } } }
<====================<====================(End OF Tree-Beginning of Tree1)====================>====================>
tree1.insert('Ⓐ'):  undefined
<----(after A:)-----> tree1:
 BST { root: TreeNode { val: 'Ⓐ', left: null, right: null } }
tree1.insert('Ⓑ'):  undefined
<----(after B:)-----> tree1:
 BST {
  root:
   TreeNode {
     val: 'Ⓐ',
     left: null,
     right: TreeNode { val: 'Ⓑ', left: null, right: null } } }
tree1.insert('Ⓒ'):  undefined
<----(after C:)-----> tree1:
 BST {
  root:
   TreeNode {
     val: 'Ⓐ',
     left: null,
     right: TreeNode { val: 'Ⓑ', left: null, right: [TreeNode] } } }
tree1.insert('Ⓓ'):  undefined
<----(afterD:)-----> tree1:
 BST {
  root:
   TreeNode {
     val: 'Ⓐ',
     left: null,
     right: TreeNode { val: 'Ⓑ', left: null, right: [TreeNode] } } }
tree1.insert('Ⓔ'):  undefined
<----(after E:)-----> tree1:
 BST {
  root:
   TreeNode {
     val: 'Ⓐ',
     left: null,
     right: TreeNode { val: 'Ⓑ', left: null, right: [TreeNode] } } }
tree1.insert('Ⓕ'):  undefined
<----(after F:)-----> tree1:
 BST {
  root:
   TreeNode {
     val: 'Ⓐ',
     left: null,
     right: TreeNode { val: 'Ⓑ', left: null, right: [TreeNode] } } }
<----(FINAL-LETTERS Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ)-----> tree1:
 BST {
  root:
   TreeNode {
     val: 'Ⓐ',
     left: null,
     right: TreeNode { val: 'Ⓑ', left: null, right: [TreeNode] } } }
 ~ aux-materials : (master) 
 */
