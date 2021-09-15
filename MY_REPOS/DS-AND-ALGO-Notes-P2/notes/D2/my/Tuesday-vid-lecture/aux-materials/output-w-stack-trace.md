```js
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
console.trace(
    "first trace------------------------------------------------------------------------"
);
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
console.trace(
    "second trace------------------------------------------------------------------------"
);
let tree = new BST();
console.trace(
    "third trace------------------------------------------------------------------------"
);
tree.insert(10);
console.log("tree.insert(10): ", tree.insert(10));
tree.insert(5);
console.log("tree.insert(5): ", tree.insert(5));
tree.insert(16);
console.log("tree.insert(16): ", tree.insert(16));
console.trace(
    "fourth trace-----------------after inserting the first 16--------------------------------"
);
tree.insert(1);
console.log("tree.insert(1): ", tree.insert(1));
tree.insert(7);
console.log("tree.insert(7): ", tree.insert(7));
tree.insert(16);
console.log("tree.insert(16): ", tree.insert(16));
console.log(
    "<----(FINAL, Numbers: 10 , 5 , 16 , 1 , 7 , 16 )-----> tree: ",
    "\n",
    tree
);
console.trace(
    "fifth trace-----------------after logging number tree-----------------------"
);
let tree1 = new BST();
console.trace(
    "sisth trace-----------------after instantiating tree1-----------------------"
);
tree1.insert(10);
console.log("tree1.insert('Ⓐ'): ", tree1.insert("Ⓐ"));
tree1.insert(5);
console.log("tree1.insert('Ⓑ'): ", tree1.insert("Ⓑ"));
tree1.insert(16);
console.log("tree1.insert('Ⓒ'): ", tree1.insert("Ⓒ"));
tree1.insert(1);
console.log("tree1.insert('Ⓓ'): ", tree1.insert("Ⓓ"));
tree1.insert(7);
console.log("tree1.insert('Ⓔ'): ", tree1.insert("Ⓔ"));
tree1.insert(16);
console.log("tree1.insert('Ⓕ'): ", tree1.insert("Ⓕ"));
console.log("<----(FINAL-LETTERS Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ)-----> tree1: ", "\n", tree1);
console.trace(
    "seventh trace-----------------final after letter tree-----------------------"
);
```

![](console.trace1.png)

```

Trace: first trace------------------------------------------------------------------------
    at Object.<anonymous> (/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week-8/projects/D1/first-attempt/Tuesday-vid-lecture/aux-materials/example-bt.js:41:9) 
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
Trace: second trace------------------------------------------------------------------------
    at Object.<anonymous> (/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week-8/projects/D1/first-attempt/Tuesday-vid-lecture/aux-materials/example-bt.js:100:9)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
Trace: third trace------------------------------------------------------------------------
    at Object.<anonymous> (/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week-8/projects/D1/first-attempt/Tuesday-vid-lecture/aux-materials/example-bt.js:104:9)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
tree.insert(10):  undefined
tree.insert(5):  undefined
tree.insert(16):  undefined
Trace: fourth trace-----------------after inserting the first 16--------------------------------
    at Object.<anonymous> (/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week-8/projects/D1/first-attempt/Tuesday-vid-lecture/aux-materials/example-bt.js:113:9)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
tree.insert(1):  undefined
tree.insert(7):  undefined
tree.insert(16):  undefined
<----(FINAL, Numbers: 10 , 5 , 16 , 1 , 7 , 16 )-----> tree:
 BST {
  root:
   TreeNode {
     val: 10,
     left: TreeNode { val: 5, left: [TreeNode], right: [TreeNode] },
     right: TreeNode { val: 10, left: null, right: [TreeNode] } } }
Trace: fifth trace-----------------after logging number tree-----------------------
    at Object.<anonymous> (/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week-8/projects/D1/first-attempt/Tuesday-vid-lecture/aux-materials/example-bt.js:127:9)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
Trace: sisth trace-----------------after instantiating tree1-----------------------
    at Object.<anonymous> (/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week-8/projects/D1/first-attempt/Tuesday-vid-lecture/aux-materials/example-bt.js:131:9)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
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
Trace: seventh trace-----------------after inserting f-----------------------
    at Object.<anonymous> (/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week-8/projects/D1/first-attempt/Tuesday-vid-lecture/aux-materials/example-bt.js:145:9)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
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
Trace: eigth trace-----------------final after letter tree-----------------------
    at Object.<anonymous> (/mnt/c/Users/15512/Google Drive/a-A-September/weeks/week-8/projects/D1/first-attempt/Tuesday-vid-lecture/aux-materials/example-bt.js:150:9)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)

```
