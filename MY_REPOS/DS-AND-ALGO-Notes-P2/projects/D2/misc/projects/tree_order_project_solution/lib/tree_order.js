function inOrderArray(root) {
	if (!root) return [];

	return [ ...inOrderArray(root.left), root.val, ...inOrderArray(root.right) ];
}

class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

let root = new TreeNode('root');

let nodeA = new TreeNode('a');
let nodeB = new TreeNode('b');
let nodeC = new TreeNode('c');
let nodeD = new TreeNode('d');
let nodeE = new TreeNode('e');

root.left = nodeA;
root.right = nodeB;

nodeA.left = nodeC;
nodeC.left = nodeE;
nodeC.right = nodeD;

// 		  	 root
// 	  	a         b
//   c
// e   d

// preorder: root, a, c, e, d, b;
// inorder: e, c, d, a, root, b;
// postorder: e, d, c, a, b, root;
console.log(root);
console.log(inOrderArray(root));

function postOrderArray(root) {
	if (!root) return [];

	return [ ...postOrderArray(root.left), ...postOrderArray(root.right), root.val ];
}

module.exports = {
	inOrderArray,
	postOrderArray
};
