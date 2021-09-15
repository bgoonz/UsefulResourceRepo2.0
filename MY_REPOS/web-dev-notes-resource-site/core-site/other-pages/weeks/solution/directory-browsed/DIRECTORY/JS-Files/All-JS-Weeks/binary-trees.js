/* Binary Trees and Binary Search Trees */
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
        this.length = 0;
    }

/* Insert Method */
    insert(val, currentNode) {
        let newNode = new TreeNode(val);
        if(this.length === 0) {
            this.length++;
            return this.root = newNode;
        }
        if(current === undefined) current = this.root;
        if(!current.left && newNode.val < current.val) {
            current.right = newnOde
        }
    }

/* Find min Method */
    findMin(root) {
        if(!root) return null;
        if((!root.left && !root.right) || (!root.left && root.right)) return root;
        if(root.left) return this.findMin(root.left);
    }

/* Get Height Method */
    getHeight(root) {
        if(!root) return -1;
        return 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));l
    }

/* Searching recursively*/
    searchRecur(val, current) {
        if(this.length ===0) return false;
        if(current === undefined) current = this.root;
        if(val === current.val) return true;
        if(current.left && val < current.val) {
          return this.searchRecur(val, current.left);
        }
        if(current.right && val >= current.val) {
          return this.searchRecur(val, current.right);
        }
        return false;
      }

/* Searching Iteratively */
      searchIter(val){
        if(this.length === 0 ) return false;
        let visited = new Array();
        let queue = [this.root]
        while (queue.length){
          let node = queue.shift();
          visited.push(node.val);
          if(node.left)queue.push(node.left);
          if(node.right)queue.push(node.right);
        }
        return visited.includes(val);

/* ---------------------------------------------------------------------------------*/

/* These are all depth first traversals, but you use pre, in, or post depending
    on what order you want to return the nodes */
/* Preorder Traversal */
    preOrderArray(root) {
        if(!root) return [];
        let left = this.preOrderArray(root.left);
        let right = this.preOrderArray(root.left);
        return [root.val, ...left, ...right];
    }

/* In order Traversal */
    inOrderArray(root) {
        if(!root) return [];
        let left = this.preOrderArray(root.left);
        let right = this.preOrderArray(root.left);
        return [...left, root.val, ...right];
    }

/* Post order Traversal */
    postOrderArray(root) {
        if(!root) return [];
        let left = this.preOrderArray(root.left);
        let right = this.preOrderArray(root.left);
        return [...left, ...right, root.val];
    }
/* ---------------------------------------------------------------------------------*/

/* Breadth First Transversal, always use a queue when doing Breadth */
    beadthFirstTransversal() {
        if(!root) return [];
        let visited = new Array();
        let queue = [root];

        while(queue.length) {
            let currentNode = queue.shift();
            visited.push(currentNode.val);

            if(currentNode.left)queue.push(node.left);
            if(currentNode.right)queue.push(node.right);
        }
        return visited;
    }
}
