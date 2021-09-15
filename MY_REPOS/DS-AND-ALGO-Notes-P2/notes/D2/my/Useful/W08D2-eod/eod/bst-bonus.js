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

	// Removing a node based on value!
	// This will not be assessed! There are many possible scenarios that we need
	// to account for when removing a node. This is a great exercise to try to
	// implement on your own, though!
	//
	// Remember the following criteria need to be upheld when removing a node:
	//   - Leaf Node (no children)
	//     - Remove the reference to this child from the parent.
	//   - Node with One Child
	//     - Update the reference to this child from the parent to point to the child instead of the removed node.
	//   - Node with Two Children
	//     - Go to the right once, then all the way to the left.
	//     - This process gets us the node with the next-highest value after the one we are trying to remove. Our goal is to replace the removed node with this one.
	//     - Copy the value of the replacement node into the node that we are removing.
	//     - Now we need to remove the original node that we just copied. This is a recursive procedure, since the process will follow one of the two scenarios above (either removing a leaf node or a node with one child).
	remove(value) {
		// If our tree is empty, exit the function; nothing to remove
		if (!this.root) return;

		let found = false;
		let current = this.root;
		let parent = null;

		// Iteratively look for the node that corresponds to 'value'
		// We can't use our function because we also want a reference to the parent
		while (!found && current !== null) {
			if (value < current.val) {
				parent = current;
				current = current.left;
			} else if (value > current.val) {
				parent = current;
				current = current.right;
			} else {
				found = true;
			}
		}

		// If our value doesn't exist in the tree, exit the function; nothing to remove
		if (!found) return;

		// Maintain a reference to the node we need to remove
		// ("current" doesn't make sense as a name anymore, we are just renaming it for clarity)
		const nodeToRemove = current;

		// Set up a variable that will ultimately reference the node that will be moved to "nodeToRemove's" location
		let replacement = null;

		// If we have two children, find the left-most descendent of the right child
		if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
			replacement = nodeToRemove.right;

			// while we still have a left child, keep moving down
			while (replacement.left !== null) {
				replacement = replacement.left;
			}

			// reassign the value of our node to remove with the replacement value
			nodeToRemove.val = replacement.val;

			// initialize a new instance of a BST with the right subtree as the root
			const rightSubTree = new BST();
			rightSubTree.root = nodeToRemove.right;
			// call remove on the value that was just moved up as the replacement
			// doing this recursive call will account for both scenarios:
			// 1) our node was a leaf and can be removed completely
			// 2) our node only had right children, which can be moved up
			rightSubTree.remove(replacement.val);

			// If the node we are removing only has left children, move the branch up
			// This is accomplished by replacing the value and child pointers with the current left
		} else if (nodeToRemove.left !== null) {
			replacement = nodeToRemove.left;
			nodeToRemove.val = replacement.val;
			nodeToRemove.left = replacement.left;
			nodeToRemove.right = replacement.right;
			// If the node we are removing only has right children, move the branch up
			// This is accomplished by replacing the value and child pointers with the current right
		} else if (nodeToRemove.right !== null) {
			replacement = nodeToRemove.right;
			nodeToRemove.val = replacement.val;
			nodeToRemove.left = replacement.left;
			nodeToRemove.right = replacement.right;
			// If the above cases are not met, our node to remove has no children
			// If this node is the root, we have no parent to adjust, so we just assign the root to null
		} else if (!parent) {
			this.root = null;
			// Finally, if we have no children and we do have a parent, we have to assign the
			// parent's left or right pointer to null accordingly, depending on if we are
			// the left or right child (which we know by comparing our value to our parent)
		} else {
			if (nodeToRemove.val < parent.val) {
				parent.left = null;
			} else {
				parent.right = null;
			}
		}
	}
}

module.exports = {
	TreeNode,
	BST
};

//
// Additional test scenarios for the (bonus) remove function:
//
function inOrderArray(root) {
	if (!root) return [];

	return [ ...inOrderArray(root.left), root.val, ...inOrderArray(root.right) ];
}

function postOrderArray(root) {
	if (!root) return [];

	return [ ...postOrderArray(root.left), ...postOrderArray(root.right), root.val ];
}

let myBST = new BST();

myBST.insert(9);
myBST.insert(5);
myBST.insert(10);
myBST.insert(2);
myBST.insert(8);
myBST.insert(6);
myBST.insert(7);

console.log('orginal tree');

//           9
//       5        10
//   2      8
//        6
//          7

console.log('inOrder expected: [2, 5, 6, 7, 8, 9, 10], actual:', inOrderArray(myBST.root));
// [2, 5, 6, 7, 8, 9, 10]
console.log('postOrder expected: [2, 7, 6, 8, 5, 10, 9], actual:', postOrderArray(myBST.root));
// [2, 7, 6, 8, 5, 10, 9]

// Removing a node with two children
console.log('\nremoving node with value 5 (two children)');
myBST.remove(5);

//           9
//       6        10
//   2      8
//        7

console.log('inOrder expected: [2, 6, 7, 8, 9, 10], actual:', inOrderArray(myBST.root));
// [2, 6, 7, 8, 9, 10]
console.log('postOrder expected: [2, 7, 8, 6, 10, 9], actual:', postOrderArray(myBST.root));
// [2, 7, 8, 6, 10, 9]

// Removing a node with one child
console.log('\nremoving node with value 8 (one child)');
myBST.remove(8);

//           9
//       6        10
//   2      7

console.log('inOrder expected: [2, 6, 7, 9, 10], actual:', inOrderArray(myBST.root));
// [2, 6, 7, 9, 10]
console.log('postOrder expected: [2, 7, 6, 10, 9], actual:', postOrderArray(myBST.root));
// [2, 7, 6, 10, 9]

// Removing a node with no children
console.log('\nremoving node with value 7 (no children)');
myBST.remove(7);

//           9
//       6        10
//   2

console.log('inOrder expected: [2, 6, 9, 10], actual:', inOrderArray(myBST.root));
// [2, 6, 9, 10]
console.log('postOrder expected: [2, 6, 10, 9], actual:', postOrderArray(myBST.root));
// [2, 6, 10, 9]
