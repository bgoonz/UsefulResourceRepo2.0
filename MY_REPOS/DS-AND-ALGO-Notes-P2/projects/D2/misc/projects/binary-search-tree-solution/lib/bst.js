class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class BST {
	constructor() {
		this.root = null;
	}

	insert(val, currentNode = this.root) {
		if (!this.root) {
			this.root = new TreeNode(val);
			return;
		}

		if (val < currentNode.val) {
			if (!currentNode.left) {
				currentNode.left = new TreeNode(val);
			} else {
				this.insert(val, currentNode.left);
			}
		} else {
			if (!currentNode.right) {
				currentNode.right = new TreeNode(val);
			} else {
				this.insert(val, currentNode.right);
			}
		}
	}

	searchRecur(val, currentNode = this.root) {
		if (!currentNode) return false;

		if (val < currentNode.val) {
			return this.searchRecur(val, currentNode.left);
		} else if (val > currentNode.val) {
			return this.searchRecur(val, currentNode.right);
		} else {
			return true;
		}
	}

	searchIter(val) {
		let currentNode = this.root;

		while (currentNode) {
			if (val < currentNode.val) {
				currentNode = currentNode.left;
			} else if (val > currentNode.val) {
				currentNode = currentNode.right;
			} else {
				return true;
			}
		}

		return false;
	}
}

module.exports = {
	TreeNode,
	BST
};
