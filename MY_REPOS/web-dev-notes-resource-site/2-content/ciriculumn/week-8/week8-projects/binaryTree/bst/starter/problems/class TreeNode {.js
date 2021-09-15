class TreeNode {
	constructor(value) {
		this.val = value;
		this.left = null;
		this.right = null;
	}
}

let a = new TreeNode(10);
let b = new TreeNode(9);
let c = new TreeNode(15);
let d = new TreeNode(1);
let e = new TreeNode(7);
let f = new TreeNode(5);
let g = new TreeNode(12);

;
a.left = b
a.right = c
a



function getHeight(root) {
	if (!root) return -1;
	let currentRight = root.right;
	let currentLeft = root.left;
	let rightHeight = 0;
	let leftHeight = 0;
	// find height of l.subtree
	// find height of r.subtree
	// compare the two subtree height
	while (currentLeft) {
        currentLeft = currentLeft.left; 
        leftHeight
        currentLeft
		leftHeight++;
	}
	while (currentRight) {
		currentRight = currentRight.right;
		rightHeight++;
	}
	if (leftHeight === rightHeight) return leftHeight;
	if (leftHeight > rightHeight) return (leftHeight += 1);
	if (leftHeight < rightHeight) return (rightHeight += 1);
}

getHeight(a
)
