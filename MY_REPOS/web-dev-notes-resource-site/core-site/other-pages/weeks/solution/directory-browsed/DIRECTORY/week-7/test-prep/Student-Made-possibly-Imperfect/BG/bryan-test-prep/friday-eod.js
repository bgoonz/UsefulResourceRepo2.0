//! Linked List
// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
//
// -----------
// Let's Code!
// -----------
// TODO: Implement a Linked List Node class here
class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}
// TODO: Implement a Singly Linked List class here
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    // TODO: Implement the addToTail method here
    addToTail(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
            // new tail's .prev
        }
        this.length++;
        return this;
    }
    // TODO: Implement the removeTail method here
    removeTail() {
        let oldTail = undefined;
        if (this.tail) {
            if (this.tail === this.head) {
                this.head = null;
                this.tail = null;
            } else {
                let currentNode = this.head;
                while (currentNode.next !== this.tail) {
                    currentNode = currentNode.next
                }
                oldTail = currentNode.next;
                currentNode.next = null;
                this.tail = currentNode;
            }
            this.length--;
        }
        return oldTail;
    }
    // TODO: Implement the addToHead method here
    addToHead(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    // TODO: Implement the removeHead method here
    removeHead() {
        let oldHead = undefined;
        if (this.head) {
            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
            } else {
                oldHead = this.head
                const newHead = oldHead.next;
                this.head = newHead;
                this.head.prev = null;
            }
            this.length--;
        }
        return oldHead;
    }
    // TODO: Implement the contains method here
    contains (target) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value == target) { // or currentNode == target
                return true; 
            }
            currentNode = currentNode.next
        }
        return false; 
    }
    // TODO: Implement the get method here
    get (index) {
        let counter = 0;
        let currentNode = this.head;
        while (counter < index) {
            counter++;
            if (currentNode) {
                currentNode = currentNode.next;
            }
        }
        return currentNode;
    }
    // TODO: Implement the set method here
    set(index, val) {
        if (index < this.length) {
            let currentNode = this.get(index);
            currentNode.value = val;
            return true;
        } else {
            return false;
        }
    }
    // TODO: Implement the insert method here
    insert(index, val) {
        if (index < this.length) {
            let currentNode = this.get(index);
            let previousNode = this.get(index - 1);
            const newNode = new Node(val);
            previousNode.next = newNode;
            newNode.next = currentNode;
            newNode.prev = previousNode;
            currentNode.prev = newNode;
            this.length++;
            return true;
        } else {
            return false;
        }
    }
    // TODO: Implement the remove method here
    remove(index) {
        if (index < this.length) {
            let previousNode = this.get(index - 1);
            let currentNode = this.get(index);
            previousNode.next = currentNode.next;
            currentNode.next.prev = previousNode;
            this.length--;
            return currentNode;
        } else {
            return undefined;
        }
        // return what?
    }
    // TODO: Implement the size method here
    size() {
        return this.length;
    }
}
exports.Node = Node;
exports.LinkedList = LinkedList;
