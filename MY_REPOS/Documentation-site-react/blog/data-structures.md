---
slug: Data structures
title: Data Structures
author: Bryan Guner
author_title: Web Developer
author_url: https://github.com/bgoonz
author_image_url: https://avatars.githubusercontent.com/u/66654881?s=460&u=4614c45125eb6ab7e4b04468cb9cdf5c998c879d&v=4
tags: [Data Structures, Algorithms]
---

**Data Structures** {#bdata-structuresb .mume-header}
===================

### **Jump to...** {#bjump-tob .mume-header}

-   [Linked Lists](#linkedlists)
-   [Stacks](#stacks)
-   [Queues](#queues)
-   [Heaps](#heaps)
-   [Binary Trees](#binarytrees)
-   [Graphs](#graphs)

Linked Lists []() {#linked-lists-a-idlinkedlista .mume-header}
-----------------

-   Data structure that contains a head, tail, and length property
-   Consist of **nodes** and each node has a value and a pointer to
    another node or null
-   Types of Linked Lists:

-   Singly Linked
    -   Nodes have a single pointer connecting them in a single
        direction.
-   Doubly Linked
    -   Nodes have two pointers connecting them bi-directionally.
-   Multiply Linked
    -   Nodes have two or more pointers, providing a variety of
        potential node orderings.
-   Circularly Linked
    -   Final node's next pointer points to the first node, creating a
        non-linear, circular version of a Linked List.

#### Comparisons with Arrays {#comparisons-with-arrays .mume-header}

-   ##### Lists:

    -   Do not have indices!
    -   Connected via nodes with a **next** pointer
    -   Random access is not allowed
-   ##### Arrays:

    -   Indexed in order!
    -   Insertion and deletion can be expensive
    -   Can quickly be accessed at a specific index

* * * * *

Singly Linked Lists {#singly-linked-lists .mume-header}
-------------------

* * * * *

![picture alt](https://miro.medium.com/max/953/1*elJncKhH_P9oQglfI1aVQA.png) {#picture-althttpsmiromediumcommax9531eljnckhh_p9oqglfi1avqapng .mume-header}
----------------------------------------------------------------------------

* * * * *

### Setting Up Node Class & Linked List Class {#setting-up-node-class-linked-list-class .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
  class Node {
      constructor(val) {
          this.value = val;
          this.next = null;
      }
  }

  class LinkedList {
      constructor() {
          this.head = null;
          this.tail = null;
          this.length = 0;
      }
  }
```

* * * * *

Insertion {#uinsertionu .mume-header}
---------

* * * * *

### Add to Head - `unshift()`{.language-javascript} {#add-to-head-unshift .mume-header}

-   Adds a new node to the head of the Linked Lists

-   Returns an Updated Linked List

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
    // Should accept a value
    addToHead(val) {
      // Create a new node using the value passed to the fn
      let newNode = new Node(val);

      // If there is no head property on the list
      if(!this.head) {
        // set the head and tail to be the newly created node
        this.head = newNode;
        this.tail = newNode; // or this.head??
      } else {
        // otherwise set the newly created node's next property to be the current head property on the list
        newNode.next = this.head;
        // set the head property to be the new node
        this.head = newNode;
      }

      // increment the length by 1
      this.length++;
      //return the linked list
      return this;
    }
    ```

### Add to Tail - `Push()`{.language-javascript} {#add-to-tail-push .mume-header}

-   Adds a new node to the tail of the Linked List.

-   Returns an Updated Linked List

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
    // Should accept a value
    addToTail(val) {
      // Create a new node using the value passed to the fn
      const newNode = new Node(val);

      // If there is no head property on the list
      if(!this.head) {
        // set the head to be the newly created node
        this.head = newNode;
      } else {
        // Otherwise set the new property on the tail to be the new node
        this.tail.next = newNode;
      }

      //set the tail property to be the newly created node
      this.tail = newNode;
      // increment the length by one
      this.length++;
      return this;
    }
    ```

### Insert At {#insert-at .mume-header}

-   Inserts a new node at the "index", or position, specified.

-   Returns a Boolean

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
    //Should accept an index and value for insertion
    insert(index, val) {
      // If the index is less than zero or greater than the length, return false
      if (index < 0 || index >= this.length) return false;
      // If the index is the same as the length, push a new node to the end of the list
      if (index === this.length) return !!this.addToTail(val);
      // If the index is add a new node to the start of the list
      if (index === 0) return !!this.addToHead(val);

      const newNode = new Node(val);
      // Access the node before the insertion point
      const prev = this.get(index - 1);
      // Save the node at insertion point to a variable
      const temp = prev.next;
      // Set the node at the insertion point to the new node with the value passed in
      prev.next = newNode;
      // Set the the property replaced at insertion point to be next property after new node
      newNode.next = temp;
      // increment the length
      this.length++;
      return true;
    }
    ```

* * * * *

Deletion {#udeletionu .mume-header}
--------

* * * * *

### Remove Head - `shift()`{.language-javascript} {#remove-head-shift .mume-header}

-   Removes the node at the head of the Linked List

-   Returns Removed Node (Head)

    ``` {.language-javascript data-role="codeBlock" data-info="js"}
      removeHead() {
          // If there are no nodes, return undefined
          if (!this.head) return undefined;
          // Store the current head property in a variable
          const currentHead = this.head;
          // Set the head property to be the current head's next property
          this.head = currentHead.next;

          // Decrement by 1
          this.length--;
          if (this.length === 0) {
              this.tail = null;
          }
          // Return the value of the node removed
          return currentHead;
    }
    ```

### Remove Tail - `pop()`{.language-javascript} {#remove-tail-pop .mume-header}

-   Removes the node at the tail of the Linked List
-   Returns Removed Node (Tail)

``` {.language-javascript data-role="codeBlock" data-info="js"}
  removeTail() {

      // If there are no nodes in the list, return undefined
      if (!this.head) return undefined;
      let current = this.head;
      let newTail = current;
      // Loop through the list until you reach the tail (there is a next node)
      while (current.next) {
          newTail = current;
          current = current.next;
      }
      // set the tail to be the 2nd to last node
      this.tail = newTail;
      // set the next property of the 2nd to last node to be null
      this.tail.next = null;
      // decrement the length of the list by 1
      this.length--;
      if (this.length === 0) {
          this.head = null;
          this.tail = null;
      }
      // return the value of the node removed
      return current;
  }
```

### Remove an Element

-   Removes an element from the Linked List.
-   If found, returns the removed element
-   If it's not found, it returns -1

``` {.language-javascript data-role="codeBlock" data-info="js"}
  // removes a given element from the list
  removeElement(element) {
      var current = this.head;
      var prev = null;

      // iterate over the list
      while (current != null) {
          // comparing element with current element if found then remove the and return true
          if (current.element === element) {
              if (prev == null) {
                  this.head = current.next;
              } else {
                  prev.next = current.next;
              }
              this.size--;
              return current.element;
          }
          prev = current;
          current = current.next;
      }
      return -1;
  }
```

### Remove From {#remove-from .mume-header}

-   Removes the node at "index", or position, specified.
-   Returns Removed node

``` {.language-javascript data-role="codeBlock" data-info="js"}
  // Should accept an index of node to be removed
  remove(index) {
      // If the index does not exist in the list, return undefined
      if (index < 0 || index >= this.length) return undefined;
      // if the index is 0, remove the first node
      if (index === 0) return this.removeHead();
      // if the index is the last node in the list, remove the node
      if (index === this.length - 1) return this.removeTail();

      // Otherwise access the node before the node to be removed
      const previousNode = this.get(index - 1);
      // save the node to be removed as a variable
      const removed = previousNode.next;
      // set the next property on that node to be the next of the next node
      previousNode.next = removed.next;

      // Decrement the length
      this.length--;
      // return the value of the node removed
      return removed;
  }
```

* * * * *

Search
------

* * * * *

### Contains

-   Searches the Linked List for a node with the value specified
-   Returns a Boolean

``` {.language-javascript data-role="codeBlock" data-info="js"}
  // Should accept a search value
  contains(target) {

      let node = this.head;
      // Loop through the list
      while (node) {
          // If the current node value matches the target, return true
          if (node.value === target) return true;
          node = node.next;
      }
      return false;
  }
```

* * * * *

Access
------

* * * * *

### Get

-   Gets node at the "index", or position, specified.
-   Returns Node at index

``` {.language-javascript data-role="codeBlock" data-info="js"}
  // Should accept an index
  get(index) {
      // If the index does not exist in the list, return null
      if (index < 0 || index >= this.length) return null;
      let counter = 0;
      let current = this.head;
      // Loop through the list until you reach the index
      while (counter !== index) {
          current = current.next;
          counter++;
      }
      // return the node at that specific index
      return current;
  }
```

### Set {#set .mume-header}

-   Updates the value of a node at the "index", or position, specified.
-   Returns a Boolean

``` {.language-javascript data-role="codeBlock" data-info="js"}
  // Should accept a value and an index of node to update
  set(index, val) {
      // Access node at specified index
      const foundNode = this.get(index);
      // If the node is found
      if (foundNode) {
          // set the value of that node to be the value passed to the fn
          foundNode.value = val;
          return true;
      }
      // Otherwise (if it is not found) return false
      return false;
  }
```

* * * * *

### Size {#size .mume-header}

-   Returns the current length of the Linked List as an integer

``` {.language-javascript data-role="codeBlock" data-info="js"}
  size() {
      return this.length;
  }
```

* * * * *

Stacks []() {#ustacksu-a-idstacksa .mume-header}
===========

-   LIFO (Last in First Out) data structure
-   The last element added to the stack will be the first element
    removed from the stack

#### Practical Applications: {#practical-applications .mume-header}

-   The Call Stack is a Stack data structure, and is used to manage the
    order of function invocations in your code.
-   Browser History is often implemented using a Stack, with one great
    example being the browser history object in the very popular React
    Router module.
-   Undo/Redo functionality in just about any application

* * * * *

### Properties {#properties .mume-header}

-   `top`{.language-javascript} - first node in the stack
-   `bottom`{.language-javascript} - last node in the stack
-   `length`{.language-javascript} - number of nodes in the stack

* * * * *

### Stack Class {#stack-class .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }
}
```

* * * * *

### Insertion {#insertion .mume-header}

-   Adds a Node to the top of the Stack
-   Returns new size of stack

``` {.language-javascript data-role="codeBlock" data-info="js"}
  push(val) {
    const newNode = new Node(val);
    if (!this.top) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      const temp = this.top;
      this.top = newNode;
      this.top.next = temp;
    }
    return ++this.length;
  }
```

* * * * *

### Deletion {#deletion .mume-header}

-   Removes a Node from the top of the Stack
-   Returns Node removed

``` {.language-javascript data-role="codeBlock" data-info="js"}
  pop() {
    if (!this.top) {
      return null;
    }
    const temp = this.top;
    if (this.top === this.bottom) {
      this.bottom = null;
    }
    this.top = this.top.next;
    this.length--;
    return temp.value;
  }
```

* * * * *

Queues []() {#uqueuesu-a-idqueuesa .mume-header}
===========

-   FIFO Data Structure
-   First In First Out
-   Practical application in programming:
    -   Background tasks
    -   Uploading resources
    -   Printing/Task processing

* * * * *

### Practical Applications: {#practical-applications-1 .mume-header}

-   Printers use a Queue to manage incoming jobs to ensure that
    documents are printed in the order they are received.
-   Chat rooms, online video games, and customer service phone lines use
    a Queue to ensure that patrons are served in the order they arrive

* * * * *

### Properties {#properties-1 .mume-header}

-   `front`{.language-javascript} - first node in the Queue
-   `back`{.language-javascript} - last node in the Queue
-   `length`{.language-javascript} - Number of nodes in the Queue

* * * * *

### Queue Class {#queue-class .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
class Node {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

* * * * *

### Insertion {#insertion-1 .mume-header}

#### Enqueue {#enqueue .mume-header}

-   Adds a Node to the front of the Queue.
-   Returns new size of Queue as an integer

``` {.language-javascript data-role="codeBlock" data-info="js"}
  enqueue(val) {
    const newNode = new Node(val);
    if(!this.front) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }
    return ++this.length;
  }

```

* * * * *

### Deletion {#deletion-1 .mume-header}

#### Dequeue {#dequeue .mume-header}

-   Removes a Node from the front of the Queue.
-   Returns node removed

``` {.language-javascript data-role="codeBlock" data-info="js"}
  dequeue() {
    if (!this.front) {
      return null;
    }
    const temp = this.front;
    if (this.front === this.back) {
      this.back = null;
    }
    this.front = this.front.next;
    this.length--;
    return temp.value;
  }
```

* * * * *

### Print {#print .mume-header}

#### Print Queue {#print-queue .mume-header}

-   Returns all elements in Queue

``` {.language-javascript data-role="codeBlock" data-info="js"}
  printQueue() {
      let str = ""
      for(var i = 0; i < this.items.length; i++)
          str += this.items[i] +" ";
      return str;
  }
```

* * * * *

Binary Heaps []() {#binary-heaps-a-idheapsa .mume-header}
=================

-   Type of binary tree
-   Partially ordered data structure, whereas a BST has a full order
-   Useful when solving problems that require data to be "partially
    sorted"
-   Root of the tree will be the maximum (max heap) or the minimum (min
    heap)

![picture alt](https://www.geeksforgeeks.org/wp-content/uploads/MinHeapAndMaxHeap.png) {#picture-althttpswwwgeeksforgeeksorgwp-contentuploadsminheapandmaxheappng .mume-header}
--------------------------------------------------------------------------------------

#### Min Binary Heap {#min-binary-heap .mume-header}

-   Parent nodes are always smaller than child nodes

#### Max Binary Heap {#max-binary-heap .mume-header}

-   Each parent has at most two child nodes
-   The value of each parent node is **always** greater than its child
    nodes
-   The parent is greater than the children, but there are no guarantees
    between sibling nodes.

``` {.language-javascript data-role="codeBlock" data-info="js"}
class MaxHeap {
    constructor() {
        this.array = [null];
    }

    getParent(idx) {
        return Math.floor(idx / 2);
    }

    getLeftChild(idx) {
        return idx * 2;
    }

    getRightChild(idx) {
        return idx * 2 + 1;
    }
```

### Addition {#addition .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
    insert(val) {
        // add the new node to the bottom level, far-left
        this.array.push(val);

        // then, sift that value up the heap to restore heap property
        this.siftUp(this.array.length - 1);
    }

    siftUp(idx) {
        // if the node is already at the root, there's no further we can sift up
        if (idx === 1) return;

        let parentIdx = this.getParent(idx);

        // if the node is bigger than it's parent, we are breaking heap property...
        if (this.array[parentIdx] < this.array[idx]) {
            // so swap the node with it's parent
            [ this.array[parentIdx], this.array[idx] ] = [ this.array[idx], this.array[parentIdx] ];

            // and continue to sift it up recursively
            this.siftUp(parentIdx);
        }
    }
```

### Deletion {#deletion-2 .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
    deleteMax() {
        // recall that we have an empty position at the very front of the array,
        // so an array length of 2 means there is only 1 item in the heap

        // if there is only 1 element in the heap, simply remove it
        if (this.array.length === 2) return this.array.pop();

        // if there are no elements in the heap, do nothing
        if (this.array.length === 1) return null;

        // otherwise remove the last element and make it the root at the front of the array
        let max = this.array[1];
        this.array[1] = this.array.pop();

        // then, sift the new root down to restore heap property
        this.siftDown(1);
        return max;
    }

    siftDown(idx) {
        let ary = this.array;
        let leftIdx = this.getLeftChild(idx);
        let rightIdx = this.getRightChild(idx);
        let leftVal = ary[leftIdx];
        let rightVal = ary[rightIdx];

        // if the node is missing children, consider the missing children as the value -Infinity
        // this allows the node to keep heap property, since any value is greater than -Infinity
        // this will also give us children values to compare later, undefined should not be used for comparison**
        if (leftVal === undefined) leftVal = -Infinity;
        if (rightVal === undefined) rightVal = -Infinity;

        // if the node is bigger than both children, we have restored heap property, so exit
        if (ary[idx] > leftVal && ary[idx] > rightVal) return;

        // otherwise the node is bigger than one of it's children,
        // so swap this node with the bigger between the two children**
        if (leftVal < rightVal) {
          var swapIdx = rightIdx;
        } else {
          var swapIdx = leftIdx;
        }
        [ ary[idx], ary[swapIdx] ] = [ ary[swapIdx], ary[idx] ];

        // and continue to sift it down recursively
        this.siftDown(swapIdx);
      }
```

* * * * *

Binary Tree []() {#binary-tree-a-idbinarytreesa .mume-header}
================

![picture alt](https://assets.aaonline.io/data_structures_algorithms/trees/images/graph_a.png) {#picture-althttpsassetsaaonlineiodata_structures_algorithmstreesimagesgraph_apng .mume-header}
----------------------------------------------------------------------------------------------

* * * * *

Terms {#terms .mume-header}
=====

-   tree - graph with no cycles
-   binary tree - tree where nodes have at most 2 nodes
-   root - the ultimate parent, the single node of a tree that can
    access every other node through edges; by definition the root will
    not have a parent
-   internal node - a node that has children
-   leaf - a node that does not have any children
-   path - a series of nodes that can be traveled through edges - for
    example A, B, E is a path through the above tree

* * * * *

Constraints {#constraints .mume-header}
===========

-   Binary trees have at most two children per node
-   Given any node of the tree, the values on the left must be strictly
    less than that node
-   Given any node of the tree, the values on the right must be strictly
    greater than or equal to that node
-   Given these constraints a binary tree is necessarily a sorted data
    structure
-   The worst binary trees devolve into a linked list, the best are
    height balanced (think branching).

* * * * *

### Tree Node Class {#tree-node-class .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let a = new TreeNode("a");
let b = new TreeNode("b");
let c = new TreeNode("c");
let d = new TreeNode("d");
let e = new TreeNode("e");
let f = new TreeNode("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
```

* * * * *

### Insertion {#insertion-2 .mume-header}

-   Start at the root
    -----------------

    -   -   -   If it is greater or equal to
            -   Check to see if there is a node to the right
                -   If there is, move to the new node and continue with
                    the node to the right as the subtree root
                -   If there is not, add the new node as the right
                    property of the current node
        -   If it is smaller
            -   Check to see if there is a node to the left
                -   If there is, move to the new node and continue with
                    the node to the left as the subtree root
                -   If there is not, add the new node as the left
                    property of the current node

``` {.language-javascript data-role="codeBlock" data-info="js"}
// Start at the root and create a new node
recursiveInsert(val, currentNode = this.root) {
  // Check if there is a root
  if (!this.root) {
    // If not the root becomes the new node
    this.root = new TreeNode(val);
    return this;
  }
  // If it is greater or equal to
  if (val < currentNode.val) {
    // Check to see
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

iterativeInsert(val, currentNode = this.root) {
  if (!this.root) {
    this.root = new TreeNode(val);
    return this;
  }
  if (val < currentNode.val) {
    if (!currentNode.left) {
      currentNode.left = new TreeNode();
    } else {
      while (true) {
        if (val < currentNode.val) {
          if (!currenNodet.left) {
            currentNode.left = new TreeNode();
            return this;
          } else {
            currentNode = currentNode.left;
          }
        } else {
          if (!currentNode.right) {
            currentNode.right = new TreeNode();
            return this;
          } else {
            currentNode = currentNode.right;
          }
        }
      }
    }
  }
}
```

* * * * *

Search Patterns {#search-patterns .mume-header}
===============

-   Breadth First Search - Check all nodes at a level before moving down
    a level
-   Depth First Search - Check the depth as far as it goes for one
    child, before\
     moving on to the next child.
    -   Pre-Order Traversal - Access the data of the current node,
        recursively visit the left sub tree, recursively visit the right
        sub tree
    -   In-Order Traversal - Recursively visit the left sub tree, access
        the data of the current node, recursively visit the right sub
        tree
    -   Post-Order Traversal - Recursively visit the left sub tree,
        recursively visit the right sub tree, access the data of the
        current node.

* * * * *

PseudoCode For Search {#pseudocode-for-search .mume-header}
=====================

-   Start at the root
    -   Check if there is a root
        -   If not, there is nothing in the tree, so the search is over
    -   If there is a root, check if the value of the root is equal to,
        greater then, or less then the value were looking for;
        -   If it is equal to the value
            -   We found what we are searching for
        -   If it is less than the value
            -   Check to see if there is a node to the left
                -   If there isn't
                    -   the value isn't in our tree
                -   If there is
                    -   repeat these steps with the node to the left as
                        the new subtree root
        -   If it is greater than the value
            -   Check to see if there is a node to the right
                -   If there isn't
                    -   the value isn't in our tree
                -   If there is
                    -   repeat these steps with the node to the right as
                        the new subtree root

* * * * *

Example Binary Search Tree {#example-binary-search-tree .mume-header}
==========================

``` {.language-javascript data-role="codeBlock" data-info="js"}
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

  // Maybe works, who knows, pulled it off the internet....

  deleteNodeHelper(root, key) {
    if (root === null) {
      return false;
    }
    if (key < root.val) {
      root.left = deleteNodeHelper(root.left, key);
      return root;
    } else if (key > root.val) {
      root.right = deleteNodeHelper(root.right, key);
      return root;
    } else {
      if (root.left === null && root.right === null) {
        root = null;
        return root;
      }
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      let currNode = root.right;
      while (currNode.left !== null) {
        currNode = currNode.left;
      }
      root.val = currNode.val;
      root.right = deleteNodeHelper(root.right, currNode.val);
      return root;
    }
  }

  //Types of Depth First Search

  preOrderTraversal(root) {
    if (!root) return [];
    let left = this.preOrderTraversal(root.left);
    let right = this.preOrderTraversal(root.right);
    return [root.val, ...left, ...right];
  }

  preOrderTraversalV2(root) {
    if (!root) return [];
    let newArray = new Array();
    newArray.push(root.val);
    newArray.push(...this.preOrderTraversalV2(root.left));
    newArray.push(...this.preOrderTraversalV2(root.right));
    return newArray;
  }

  inOrderTraversal(root) {
    if (!root) return [];
    let left = this.inOrderTraversal(root.left);
    let right = this.inOrderTraversal(root.right);
    return [...left, root.val, ...right];
  }

  inOrderTraversalV2(root) {
    if (!root) return [];
    let newArray = new Array();
    newArray.push(...this.inOrderTraversalV2(root.left));
    newArray.push(root.val);
    newArray.push(...this.inOrderTraversalV2(root.right));
    return newArray;
  }

  postOrderTraversal(root) {
    if (!root) return [];
    let left = this.postOrderTraversal(root.left);
    let right = this.postOrderTraversal(root.right);
    return [...left, ...right, root.val];
  }

  postOrderTraversalV2(root) {
    if (!root) return [];
    let newArray = new Array();
    newArray.push(...this.postOrderTraversalV2(root.left));
    newArray.push(...this.postOrderTraversalV2(root.right));
    newArray.push(root.val);
    return newArray;
  }

  //Breadth First Search

  breadthFirstSearch(root) {
    let queue = [root];
    let result = [];
    while (queue.length) {
      let current = queue.shift();
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.left);
      current.push(result);
    }
    return result;
  }
}
```

* * * * *

Graphs []() {#graphs-a-idgraphsa .mume-header}
===========

-   A graph data structure is a collection of nodes and connections
    represented as pairs

![picture alt](https://miro.medium.com/max/1482/1*3tLY8VADFc5Cr71aEnZ5mg.png) {#picture-althttpsmiromediumcommax148213tly8vadfc5cr71aenz5mgpng .mume-header}
-----------------------------------------------------------------------------

-   A graph may:
    -   lack a root node
    -   have cycles
    -   have any number of edges leaving a node

![picture alt](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/graphs/images/graphs.png) {#picture-althttpss3-us-west-1amazonawscomappacademy-open-assetsdata_structures_algorithmsgraphsimagesgraphspng .mume-header}
-----------------------------------------------------------------------------------------------------------------------------

-   **Graph 1** lacks a root.
    -   There is no single node that can access all other nodes in a
        path through edges.
-   **Graph 2** has a cycle
    -   There is no longer a parent-child relationship.
-   **Graph 3** features nodes that have more than 2 edges

* * * * *

#### Practical Applications: {#practical-applications-2 .mume-header}

-   Social Networks
-   Location/ Mapping
-   Routing Algorithms
-   Visual Hierarchy
-   File System Optimizations

#### Essential Terms {#essential-terms .mume-header}

-   **Vertex** - a node
-   **Edge** - connection between nodes
-   **Weighted/Unweighted** - values assigned to distances between
    vertices

![picture alt](https://www.geeksforgeeks.org/wp-content/uploads/undirectedgraph.png) {#picture-althttpswwwgeeksforgeeksorgwp-contentuploadsundirectedgraphpng .mume-header}
------------------------------------------------------------------------------------

* * * * *

#### GraphNode Class {#graphnode-class .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
  class GraphNode {
      constructor(val) {
          this.val = val;
          this.neighbors = [];
      }
  }

  let a = new GraphNode('a');
  let b = new GraphNode('b');
  let c = new GraphNode('c');
  let d = new GraphNode('d');
  let e = new GraphNode('e');
  let f = new GraphNode('f');
  a.neighbors = [b, c, e];
  c.neighbors = [b, d];
  e.neighbors = [a];
  f.neighbors = [e];
```

* * * * *

### Build Graph {#build-graph .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
function buildGraph(edges) {
  let graph = {};
  edges.forEach((edge) => {
    let [dest, src] = edge.map(String);
    if (dest in graph) {
      graph[dest].push(src);
    } else {
      graph[dest] = [src]
    }
  })
}
```

* * * * *

### Vertices {#vertices .mume-header}

-   Nodes in graph

##### Add Vertex {#add-vertex .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
  class Graph{
    constructor(){
      this.adjacencyList = {};
    }
    // Should accept a name of a vertex
    addVertex(vertex){
      // Should add a key to the adjacency list with the name of the vertex and set its value to be an empty array
      if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
  }
```

##### Remove Vertex {#remove-vertex .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
// Should accept a vertex to remove
removeVertex(vertex){
  // Loop through list as long as there are any other vertices for that vertex
  while(this.adjacencyList[vertex].length){
    const adjacencyVertex = this.adjacencyList[vertex].pop();
    // remove vertex and any values in the adjacency list for that vertex
    this.removeEdge(vertex, adjacencyVertex);
  }
  // delete the key in the adjacency list for that vertex
  delete this.adjacencyList[vertex]
}
```

* * * * *

### Edges {#edges .mume-header}

-   Connections between nodes

#### Add Edge {#add-edge .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
// Should accept two vertices
addEdge(v1, v2){
  // Find in the list, the key of v1 and push v2 to the array
  this.adjacencyList[v1].push(v2);
  // Find in the list, the key of v2 and push v1 to the array
  this.adjacencyList[v2].push(v1);
}
```

#### Remove Edge {#remove-edge .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
// Should accept two vertices
removeEdge(v1, v2) {
  // Reassign the key of v1 to be an array that does not contain v2
  this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
  // Reassign the key of v2 to be an array that does not contain v1
  this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
}
```

* * * * *

### Searches {#searches .mume-header}

#### Breadth First Search {#breadth-first-search .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
function breadthFirst(startingNode, targetVal) {
  let queue = [startingNode];
  let visited = new Set();

  while (queue.length) {
    let node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    if (node.val === targetVal) return node;

    queue.push(...node.neighbors)
  }
  return null;
}


function breadthFirst(start){
  const queue = [start];
  const result = [];
  const visited = {};

  while(queue.length){
    let node = queue.shift();
    result.push(node);

    this.adjacencyList[node].forEach((neighbor) => {
      if(!visited.neighbor) {
        visited[neighbor] = true;
        queue.push(neighbor)
      }
    })

  }
}
```

#### Depth First Search (Recursive) {#depth-first-search-recursive .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
function depthFirst(node, visited = new Set()) {
  if (visited.has(node.val)) return;
  visited.add(node.val)
  node.neighbors.forEach(neighbor => depthFirst(neighbor, visited))
}
```

#### Depth First Search (Iterative) {#depth-first-search-iterative .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
// Should accept a starting node
function depthFirst(start) {
  // Create a stack to help keep track of vertices(use a list/array) & add the starting vertex to it
  const stack = [start];
  // Create a list to store the end result, to be returned at the end
  const result = [];
  // Create an object to store visited vertices
  const visited = {};
  let currentVertex;

  visited[start] = true;
  // While the stack has something in it
  while(stack.length){
    console.log(stack);
    // Remove the next next vertex from the stack
    currentVertex = stack.pop();
    // add it to the result list
    result.push(currentVertex);

    this.adjacencyList[currentVertex].forEach((neighbor) => {
      // If that vertex hasn't been visited yet:
      if(!visited[neighbor]) {
        // mark it as visited
        visited[neighbor] = true;
        // push all of its neighbors into the stack
        stack.push(neighbor)
      }
    });
  }
  return result;
}
```

###### with Adjacency List {#with-adjacency-list .mume-header}

``` {.language-javascript data-role="codeBlock" data-info="js"}
function depthFirst(graph, node, visited = new Set()){
  if (visited.has(node)) return;
  graph[node].forEach((neighbor) => depthFirst(graph, neighbor, visited))
  visited.add(node)
}
```

* * * * *

-   [Data Structures](#bdata-structuresb)
    -   [Jump to...](#bjump-tob)
    -   [Linked Lists](#linked-lists-a-idlinkedlista)
        -   [Comparisons with Arrays](#comparisons-with-arrays)
    -   [Singly Linked Lists](#singly-linked-lists)
    -   [![picture
        alt](https://miro.medium.com/max/953/1*elJncKhH_P9oQglfI1aVQA.png)](#picture-althttpsmiromediumcommax9531eljnckhh_p9oqglfi1avqapng)
        -   [Setting Up Node Class & Linked List
            Class](#setting-up-node-class-linked-list-class)
    -   [Insertion](#uinsertionu)
        -   [Add to Head -
            `unshift()`{.language-javascript}](#add-to-head-unshift)
        -   [Add to Tail -
            `Push()`{.language-javascript}](#add-to-tail-push)
        -   [Insert At](#insert-at)
    -   [Deletion](#udeletionu)
        -   [Remove Head -
            `shift()`{.language-javascript}](#remove-head-shift)
        -   [Remove Tail -
            `pop()`{.language-javascript}](#remove-tail-pop)
        -   [Remove From](#remove-from)
        -   [Set](#set)
        -   [Size](#size)
-   [Stacks](#ustacksu-a-idstacksa)\
     - [Practical Applications:](#practical-applications)
    -   [Properties](#properties)
    -   [Stack Class](#stack-class)
    -   [Insertion](#insertion)
    -   [Deletion](#deletion)
-   [Queues](#uqueuesu-a-idqueuesa)
    -   [Practical Applications:](#practical-applications-1)
    -   [Properties](#properties-1)
    -   [Queue Class](#queue-class)
    -   [Insertion](#insertion-1)
        -   [Enqueue](#enqueue)
    -   [Deletion](#deletion-1)
        -   [Dequeue](#dequeue)
    -   [Print](#print)
        -   [Print Queue](#print-queue)
-   [Binary Heaps](#binary-heaps-a-idheapsa)
    -   [![picture
        alt](https://www.geeksforgeeks.org/wp-content/uploads/MinHeapAndMaxHeap.png)](#picture-althttpswwwgeeksforgeeksorgwp-contentuploadsminheapandmaxheappng)
        -   [Min Binary Heap](#min-binary-heap)
        -   [Max Binary Heap](#max-binary-heap)
        -   [Addition](#addition)
        -   [Deletion](#deletion-2)
-   [Binary Tree](#binary-tree-a-idbinarytreesa)
    -   [![picture
        alt](https://assets.aaonline.io/data_structures_algorithms/trees/images/graph_a.png)](#picture-althttpsassetsaaonlineiodata_structures_algorithmstreesimagesgraph_apng)
-   [Terms](#terms)
-   [Constraints](#constraints)
    -   [Tree Node Class](#tree-node-class)
    -   [Insertion](#insertion-2)
-   [Search Patterns](#search-patterns)
-   [PseudoCode For Search](#pseudocode-for-search)
-   [Example Binary Search Tree](#example-binary-search-tree)
-   [Graphs](#graphs-a-idgraphsa)
    -   [![picture
        alt](https://miro.medium.com/max/1482/1*3tLY8VADFc5Cr71aEnZ5mg.png)](#picture-althttpsmiromediumcommax148213tly8vadfc5cr71aenz5mgpng)
    -   [![picture
        alt](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/graphs/images/graphs.png)](#picture-althttpss3-us-west-1amazonawscomappacademy-open-assetsdata_structures_algorithmsgraphsimagesgraphspng)
        -   [Practical Applications:](#practical-applications-2)
        -   [Essential Terms](#essential-terms)
    -   [![picture
        alt](https://www.geeksforgeeks.org/wp-content/uploads/undirectedgraph.png)](#picture-althttpswwwgeeksforgeeksorgwp-contentuploadsundirectedgraphpng)
        -   [GraphNode Class](#graphnode-class)
        -   [Build Graph](#build-graph)
        -   [Vertices](#vertices)
            -   [Add Vertex](#add-vertex)
            -   [Remove Vertex](#remove-vertex)
        -   [Edges](#edges)
            -   [Add Edge](#add-edge)
            -   [Remove Edge](#remove-edge)
        -   [Searches](#searches)
            -   [Breadth First Search](#breadth-first-search)
            -   [Depth First Search
                (Recursive)](#depth-first-search-recursive)
            -   [Depth First Search
                (Iterative)](#depth-first-search-iterative)
                -   [with Adjacency List](#with-adjacency-list)

≡
