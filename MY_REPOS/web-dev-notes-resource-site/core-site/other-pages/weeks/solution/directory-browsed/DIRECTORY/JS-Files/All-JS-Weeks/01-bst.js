class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// [] Understand
// [] Plan
// [] Execute
// [] Improve

class BST {
    // Initialize an empty binary search tree
    constructor() {
        this.root = null
    }

    // Insert a node into the binary search tree
    // Plan
    // [] Check if the root exists
        // [] if it does not, then set the root to be a new TreeNode with the value
    // [] Check if the val greater the currentNode
    // [] If the value is less than the current node
        // [] Check if a left node exists
            // [] if it doesn't exist then insert it
            // [] otherwise then recurse and call pass in currentNode.left
    // [] If the value is greater or equal to the current node
        // [] Check if a right node exists
            // [] if it doesn't exist then insert it
            // [] otherwise then recurse and call pass in currentNode.right
    insert(val, currentNode=this.root) {
        // [] Check if the root exists
        if (!this.root) {  
            // [] if it does not, then set the root to be a new TreeNode with the value
            this.root = new TreeNode(val);
            return
        }
        // [] Check if the val greater the currentNode
        // [] If the value is less than the current node
        if (val < currentNode.val) {
            // [] Check if a left node exists
            if (!currentNode.left) {
                // [] if it doesn't exist then insert it
                currentNode.left = new TreeNode(val);
            } else {
                // [] otherwise then recurse and call pass in currentNode.left
                this.insert(val, currentNode.left);
            }
        } else {
        // [] If the value is greater or equal to the current node
            // [] Check if a right node exists
            if (!currentNode.right){
                // [] if it doesn't exist then insert it
                currentNode.right = new TreeNode(val);
            } else {
                // [] otherwise then recurse and call pass in currentNode.right
                this.insert(val, currentNode.right);
            }
        }

    }

    // Perform a recursive search through the binary search tree
    // Plan
    // [] Check if currentNode is true
        // [] if not return false
    // [] Compare the value with the current node's value
    // [] If it is less than the current node's value
        // [] recurse left
    // [] else if it is greater than the current node's value
        // [] recurse right
    // [] else
        // return true
    searchRecur(val, currentNode=this.root) {
        // [] Check if currentNode is true
            // [] if not return false
        if (!currentNode) return false;
        // [] Compare the value with the current node's value
        // [] If it is less than the current node's value
        if (val < currentNode.val) {
            // [] recurse left
            return this.searchRecur(val, currentNode.left);
        }
        // [] else if it is greater than the current node's value
        else if (val > currentNode.val) {
            // [] recurse right
            return this.searchRecur(val, currentNode.right);
        }
        // [] else
        else {
            // return true
            return true
        }

    }

    // Perform an iterative search through the binary search tree
    // Plan
    // [] Check if the root exists
        // [] if not return false
    // [] Initialize the currentNode to be the root
    // [] while there is a current node
        // [] if the value is less than the current node
            // update the current node the be the left
        // [] else if the value is greater than the current node
            // [] update the current value to be the right
        // [] else
            // return true
    // [] return false
    searchIter(val) {
        // [] Check if the root exists
            // [] if not return false
        if (!this.root) return false;

        // [] Initialize the currentNode to be the root
        let currentNode = this.root
        // [] while there is a current node
        while (currentNode) {
            // [] if the value is less than the current node
            if (val < currentNode.val) {
                // update the current node the be the left
                currentNode = currentNode.left;
            }
            // [] else if the value is greater than the current node
            else if (val > currentNode.val) {
                // [] update the current value to be the right
                currentNode = currentNode.right;
            }
            // [] else
            else {
                // return true
                return true
            }
        }

        // [] return false
        return false
    }
}

module.exports = {
    TreeNode,
    BST
};