// class TreeNode {
//     constructor(val) {
//         this.val = val;
//         this.left = null;
//         this.right = null;
//     }
// }
// class BST {
//     constructor() {
//         this.root = null;
//     }
//     insert(val, currentNode = this.root) {
//         if (!this.root) {
//             this.root = new TreeNode(val);
//             return;
//         }
//         if (val < currentNode.val) {
//             if (!currentNode.left) {
//                 currentNode.left = new TreeNode(val);
//             } else {
//                 this.insert(val, currentNode.left);
//             }
//         } else {
//             if (!currentNode.right) {
//                 currentNode.right = new TreeNode(val);
//             } else {
//                 this.insert(val, currentNode.right);
//             }
//         }
//     }
//     searchRecur(val, currentNode = this.root) {
//         if (!currentNode) return false;
//         if (val < currentNode.val) {
//             return this.searchRecur(val, currentNode.left);
//         } else if (val > currentNode.val) {
//             return this.searchRecur(val, currentNode.right);
//         } else {
//             return true;
//         }
//     }
//     searchIter(val) {
//         let currentNode = this.root;
//         while (currentNode) {
//             if (val < currentNode.val) {
//                 currentNode = currentNode.left;
//             } else if (val > currentNode.val) {
//                 currentNode = currentNode.right;
//             } else {
//                 return true;
//             }
//         }
//         return false;
//     }
// }
// let tree = new BST();
// tree.insert(10);
// tree.insert(5);
// tree.insert(16);
// tree.insert(1);
// tree.insert(7);
// tree.insert(16);
// console.log("tree", tree);
// /*
// expect(tree.root.val).to.equal(10);
//             expect(tree.root.left.val).to.equal(5);
//             expect(tree.root.right.val).to.equal(16);
//             expect(tree.root.left.left.val).to.equal(1);
//             expect(tree.root.left.right.val).to.equal(7);
//             expect(tree.root.right.right.val).to.equal(16);
// */
//
// console.log("tree.root.left.val: ", tree.root.left.val);
// console.log("tree.root.right.val: ", tree.root.right.val);
// console.log("tree.root.left.left.val: ", tree.root.left.left.val);
// console.log("tree.root.left.right.val: ", tree.root.left.right.val);
// console.log("tree.root.right.right.val: ", tree.root.right.right.val);
// /*
//   tree.root.left.val:  5
// tree.root.right.val:  16
// tree.root.left.left.val:  1
// tree.root.left.right.val:  7
// tree.root.right.right.val:  16
// */
