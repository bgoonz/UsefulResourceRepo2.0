class _Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}
class BST {
    constructor() {
        this.root = null;
    }
    insert(value) {
        if (this.root) {
            this._insert(this.root, value);
        } else {
            this.root = new _Node(value);
        }
    }
    _insert(root, value) {
        if (value < root.value) {
            if (root.left) {
                this._insert(root.left, value);
            } else {
                root.left = new _Node(value);
                root.left.parent = root;
            }
        } else {
            if (root.right) {
                this._insert(root.right, value);
            } else {
                root.right = new _Node(value);
                root.right.parent = root;
            }
        }
    }
    bfsPrint() {
        if (this.root) {
            return this._bfsPrint();
        } else {
            return `your tree is empty fam`;
        }
    }
    _bfsPrint() {
        const nodes = [this.root]; // [root.left, root,right]
        const li = new Array();
        while (nodes.length) {
            const node = nodes.shift();
            li.push(node.value);
            if (node.left) nodes.push(node.left);
            if (node.right) nodes.push(node.right);
        }
        return li;
    }
    dfsPreorderPrint() {
        if (this.root) {
            return this._dfsPreorderPrint(this.root);
        } else {
            return `your tree is empty fam`;
        }
    }

    _dfsPreorderPrint(root, li = new Array()) {
        li.push(root.value);
        if (root.left) this._dfsPreorderPrint(root.left, li);
        if (root.right) this._dfsPreorderPrint(root.right, li);
        return li;
    }
    dfsInorderPrint() {
        if (this.root) {
            return this._dfsInorderPrint(this.root);
        } else {
            return `your tree is empty fam`;
        }
    }
    _dfsInorderPrint(root, li = new Array()) {
        if (root.left) this._dfsInorderPrint(root.left, li);
        li.push(root.value);
        if (root.right) this._dfsInorderPrint(root.right, li);
        return li;
    }
    dfsPostorderPrint() {
        if (this.root) {
            return this._dfsPostorderPrint(this.root);
        } else {
            return `your tree is empty fam`;
        }
    }
    _dfsPostorderPrint(root, li = new Array()) {
        if (root.left) this._dfsPostorderPrint(root.left, li);
        if (root.right) this._dfsPostorderPrint(root.right, li);
        li.push(root.value);
        return li;
    }
    find(value) {
        if (this.root) {
            return this._find(this.root, value);
        }
    }
    _find(root, value) {
        if (root.value === value) {
            return root;
        } else if (value < root.value && root.left) {
            return this._find(root.left, value);
        } else if (value >= root.value && root.right) {
            return this._find(root.right, value);
        }
        return `not here fam`;
    }
    getHeight() {
        // gets the depth of tree
    }
    validBST() {
        // is it balanced?
    }
    buildTree() {
        // performs the balancing
    }
    delete(value) {
        // deletes node
        // 1. leaf node
        // 2. you have one child
        // 3. you have two children
    }
}
const tree = new BST();
tree.insert(6);
tree.insert(2);
tree.insert(7);
tree.insert(1);
tree.insert(4);
tree.insert(3);
tree.insert(5);
tree.insert(9);
tree.insert(8);
console.log(tree.bfsPrint());
console.log(tree.dfsPreorderPrint());
console.log(tree.dfsInorderPrint());
console.log(tree.dfsPostorderPrint());
console.log(tree.find(10));
console.log(tree.find(6));
console.log(tree.find(8));
