function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    add(data) {
        const node = new Node(data);
        if (!this.root) {
            this.root = node;
        } else {
            let current = this.root;
            while (current) {
                if (node.data < current.data) {
                    if (!current.left) {
                        current.left = node;
                        break;
                    }
                    current = current.left;
                } else if (node.data > current.data) {
                    if (!current.right) {
                        current.right = node;
                        break;
                    }
                    current = current.right;
                } else {
                    break;
                }
            }
        }
    }

    remove(data) {
        const that = this;
        const removeNode = (node, data) => {
            if (!node) {
                return null;
            }
            if (data === node.data) {
                if (!node.left && !node.right) {
                    return null;
                }
                if (!node.left) {
                    return node.right;
                }
                if (!node.right) {
                    return node.left;
                }
                // 2 children
                const temp = that.getMin(node.right);
                node.data = temp;
                node.right = removeNode(node.right, temp);
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            }
        };
        this.root = removeNode(this.root, data);
    }

    contains(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
    /*
  console.log("--- DFS inOrder");
binarySearchTree.traverseDFS((node) => {
    console.log(node.data);
}, "inOrder");
console.log(
    "-------------------------------------------------------------------"
);
console.log("--- DFS preOrder");
binarySearchTree.traverseDFS((node) => {
    console.log(node.data);
}, "preOrder");
console.log(
    "-------------------------------------------------------------------"
);
console.log("--- DFS postOrder");
binarySearchTree.traverseDFS((node) => {
    console.log(node.data);
}, "postOrder");
*/

    _preOrder(node, traverseType) {
        if (node) {
            if (traverseType) {
                traverseType(node);
            }
            this._preOrder(node.left, traverseType);
            this._preOrder(node.right, traverseType);
        }
    }

    _inOrder(node, traverseType) {
        if (node) {
            this._inOrder(node.left, traverseType);
            if (traverseType) {
                traverseType(node);
            }
            this._inOrder(node.right, traverseType);
        }
    }

    _postOrder(node, traverseType) {
        if (node) {
            this._postOrder(node.left, traverseType);
            this._postOrder(node.right, traverseType);
            if (traverseType) {
                traverseType(node);
            }
        }
    }

    traverseDFS(traverseType, method) {
        const current = this.root;
        if (method) {
            this[`_${method}`](current, traverseType);
        } else {
            this._preOrder(current, traverseType);
        }
    }

    traverseBFS(traverseType) {
        this.queue = [];
        this.queue.push(this.root);
        while (this.queue.length) {
            const node = this.queue.shift();
            if (traverseType) {
                traverseType(node);
            }
            if (node.left) {
                this.queue.push(node.left);
            }
            if (node.right) {
                this.queue.push(node.right);
            }
        }
    }
    print() {
        if (!this.root) {
            return console.log("No root node found");
        }
        const newline = new Node("|");
        const queue = [this.root, newline];
        let string = "";
        while (queue.length) {
            const node = queue.shift();
            string += `${node.data.toString()} `;
            if (node === newline && queue.length) {
                queue.push(newline);
            }
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        console.log(string.slice(0, -2).trim());
    }

    printByLevel() {
        if (!this.root) {
            return console.log("No root node found");
        }
        const newline = new Node("\n");
        const queue = [this.root, newline];
        let string = "";
        while (queue.length) {
            const node = queue.shift();
            if (node.data !== "\n") {
                string += node.data.toString() + " ";
            } else {
                string += node.data.toString() + "";
            }
            //!@ William : string += node.data.toString() + (node.data !== "\n" ? " " : "");
            if (node === newline && queue.length) {
                queue.push(newline);
            }
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        console.log(string.trim());
    }

    getMin(node) {
        if (!node) {
            node = this.root;
        }
        while (node.left) {
            node = node.left;
        }
        return node.data;
    }

    getMax(node) {
        if (!node) {
            node = this.root;
        }
        while (node.right) {
            node = node.right;
        }
        return node.data;
    }
}
console.log(
    "--------------------------------(1)-----------------------------------"
);
const binarySearchTree = new BinarySearchTree();
binarySearchTree.add(5);
console.log("binarySearchTree: ", binarySearchTree);
console.log(
    "--------------------------------(2)-----------------------------------"
);
binarySearchTree.add(3);
console.log("binarySearchTree: ", binarySearchTree);
console.log(
    "---------------------------------(3)----------------------------------"
);
binarySearchTree.add(7);
binarySearchTree.add(2);
binarySearchTree.add(4);
binarySearchTree.add(4);
binarySearchTree.add(6);
binarySearchTree.add(8);
console.log("binarySearchTree: ", binarySearchTree);
console.log(
    "----------------------------------(4)---------------------------------"
);
binarySearchTree.print();
console.log(
    "-----------------------------------(5)--------------------------------"
);
console.log(
    "----------------------------------(6)---------------------------------"
);
binarySearchTree.printByLevel();
console.log(
    "-----------------------------------(7)--------------------------------"
);
console.log("--- DFS inOrder");
binarySearchTree.traverseDFS((node) => {
    console.log(node.data);
}, "inOrder");
console.log(
    "------------------------------------(8)-------------------------------"
);
console.log("--- DFS preOrder");
binarySearchTree.traverseDFS((node) => {
    console.log(node.data);
}, "preOrder");
console.log(
    "-------------------------------------(9)------------------------------"
);
console.log("--- DFS postOrder");
binarySearchTree.traverseDFS((node) => {
    console.log(node.data);
}, "postOrder");
console.log(
    "-------------------------------------(10)------------------------------"
);
console.log("--- BFS");
binarySearchTree.traverseBFS((node) => {
    console.log(node.data);
});
console.log(
    "---------------------------------------(11)----------------------------"
);

console.log(" binarySearchTree.getMin(): ", binarySearchTree.getMin());
console.log(
    "----------------------------------(12)--------------------------------"
);

console.log("binarySearchTree.getMax(): ", binarySearchTree.getMax());
console.log(
    "---------------------------------(13)----------------------------------"
);

console.log(" binarySearchTree.contains(3): ", binarySearchTree.contains(3));
console.log(
    "---------------------------------(14)----------------------------------"
);
console.log("binarySearchTree.contains(9):", binarySearchTree.contains(9));
console.log(
    "----------------------------------(15)---------------------------------"
);
console.log(
    "--------------(16-new-tests-between-here-and-placeholder)---------------------------------"
);

console.log(
    "----------------------------------(placeholder)---------------------------------"
);
binarySearchTree.remove(11);
binarySearchTree.print();
console.log(
    "----------------------------------------(17)---------------------------"
);
binarySearchTree.remove(5);
binarySearchTree.print();
console.log(
    "--------------------------------------(18)-----------------------------"
);
binarySearchTree.remove(7);
binarySearchTree.print();
console.log(
    "----------------------------------------(19)---------------------------"
);
binarySearchTree.remove(8);
binarySearchTree.print();
console.log(
    "----------------------------------------(20)---------------------------"
);

binarySearchTree.remove(4);
binarySearchTree.remove(2);
binarySearchTree.remove(3);
binarySearchTree.remove(6);
binarySearchTree.print();
console.log(
    "----------------------------------------(21)---------------------------"
);
console.log("binarySearchTree.printByLevel(): ");
binarySearchTree.printByLevel();

binarySearchTree.add(10);
console.log("binarySearchTree.add(10): ", binarySearchTree);

console.log(
    "---------------------------------------(22)---------------------------"
);
binarySearchTree.add(6);
binarySearchTree.add(14);
binarySearchTree.add(4);
binarySearchTree.add(8);
binarySearchTree.add(12);
binarySearchTree.add(16);
binarySearchTree.add(3);
binarySearchTree.add(5);
binarySearchTree.add(7);
binarySearchTree.add(9);
console.log("binarySearchTree.printByLevel(): ");
binarySearchTree.printByLevel();

binarySearchTree.add(10);
console.log("binarySearchTree: ", binarySearchTree);

console.log(
    "-----------------------------------(23)--------------------------------"
);
binarySearchTree.add(11);
binarySearchTree.add(13);
binarySearchTree.add(15);
binarySearchTree.add(17);
binarySearchTree.print();
console.log(
    "-------------------------------------(24)------------------------------"
);
binarySearchTree.remove(10);
binarySearchTree.print();
console.log(
    "--------------------------------------(25))-----------------------------"
);
binarySearchTree.remove(12);
binarySearchTree.print();
console.log(
    "------------------------------------(26)-------------------------------"
);
/*
   ~ final : (master) node 02-binary-search-tree.js 
--------------------------------(1)-----------------------------------
binarySearchTree:  BinarySearchTree { root: Node { data: 5, left: null, right: null } }
--------------------------------(2)-----------------------------------
binarySearchTree:  BinarySearchTree {
  root:
   Node {
     data: 5,
     left: Node { data: 3, left: null, right: null },
     right: null } }
---------------------------------(3)----------------------------------
binarySearchTree:  BinarySearchTree {
  root:
   Node {
     data: 5,
     left: Node { data: 3, left: [Node], right: [Node] },
     right: Node { data: 7, left: [Node], right: [Node] } } }
----------------------------------(4)---------------------------------
5 | 3 7 | 2 4 6 8
-----------------------------------(5)--------------------------------
----------------------------------(6)---------------------------------
5
3 7
2 4 6 8
-----------------------------------(7)--------------------------------
--- DFS inOrder
2
3
4
5
6
7
8
------------------------------------(8)-------------------------------
--- DFS preOrder
5
3
2
4
7
6
8
-------------------------------------(9)------------------------------
--- DFS postOrder
2
4
3
6
8
7
5
-------------------------------------(10)------------------------------
--- BFS
5
3
7
2
4
6
8
---------------------------------------(11)----------------------------
 binarySearchTree.getMin():  2
----------------------------------(12)--------------------------------
binarySearchTree.getMax():  8
---------------------------------(13)----------------------------------
 binarySearchTree.contains(3):  true
---------------------------------(14)----------------------------------
binarySearchTree.contains(9): false
----------------------------------(15)---------------------------------
--------------(16-new-tests-between-here-and-placeholder)---------------------------------
----------------------------------(placeholder)---------------------------------
5 | 3 7 | 2 4 6 8
----------------------------------------(17)---------------------------
6 | 3 7 | 2 4 8
--------------------------------------(18)-----------------------------
6 | 3 8 | 2 4
----------------------------------------(19)---------------------------
6 | 3 | 2 4
----------------------------------------(20)---------------------------
No root node found
----------------------------------------(21)---------------------------
binarySearchTree.printByLevel():
No root node found
binarySearchTree.add(10):  BinarySearchTree { root: Node { data: 10, left: null, right: null }, queue: [] }
---------------------------------------(22)---------------------------
binarySearchTree.printByLevel():
10
6 14
4 8 12 16
3 5 7 9
binarySearchTree:  BinarySearchTree {
  root:
   Node {
     data: 10,
     left: Node { data: 6, left: [Node], right: [Node] },
     right: Node { data: 14, left: [Node], right: [Node] } },
  queue: [] }
-----------------------------------(23)--------------------------------
10 | 6 14 | 4 8 12 16 | 3 5 7 9 11 13 15 17
-------------------------------------(24)------------------------------
11 | 6 14 | 4 8 12 16 | 3 5 7 9 13 15 17
--------------------------------------(25))-----------------------------
11 | 6 14 | 4 8 13 16 | 3 5 7 9 15 17
------------------------------------(26)-------------------------------
*/
