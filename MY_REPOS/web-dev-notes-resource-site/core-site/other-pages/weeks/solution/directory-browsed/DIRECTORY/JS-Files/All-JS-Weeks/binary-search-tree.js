/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
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
    BST,
};

/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
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

const sam = new TreeNode("Sam");
const riv = new TreeNode("River");
const barry = new TreeNode("Barry");
const dean = new TreeNode("Dean");

const tree = new BST();
tree.root = sam;
sam.left = riv;
sam.right = barry;
riv.left = dean;
console.log(tree.banana);

const tree2 = ["sam", "river", "Barry", "dean"];
tree2.child = "sam";
console.log(tree2);

module.exports = {
    TreeNode,
    BST,
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
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

module.exports = {
    TreeNode,
    BST,
};

/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/
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

    insert(val) {
        const node = new TreeNode(val);
        if (!this.root) return (this.root = node);

        let curRoot = this.root;
        let prevRoot = this.root;
        while (curRoot) {
            prevRoot = curRoot;
            if (val < curRoot.val) {
                curRoot = curRoot.left;
                if (!curRoot) {
                    prevRoot.left = node;
                    return;
                }
            } else {
                curRoot = curRoot.right;
                if (!curRoot) {
                    prevRoot.right = node;
                    return;
                }
            }
        }
    }

    searchRecur(val, root = this.root) {
        if (!root) return false;

        if (val < root.val) return this.searchRecur(val, root.left);
        if (val > root.val) return this.searchRecur(val, root.right);

        return true;
    }

    searchIter(val) {
        let curNode = this.root;

        while (curNode) {
            if (val === curNode.val) {
                return true;
            } else if (val < curNode.val) {
                curNode = curNode.left;
            } else {
                curNode = curNode.right;
            }
        }

        return false;
    }
}

module.exports = {
    TreeNode,
    BST,
};
