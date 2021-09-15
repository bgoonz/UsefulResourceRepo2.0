/*Added a write file to the output for a visual aid for understanding
how the linkage works. test.txt is the output file */

const util = require("util");
const fs = require("fs");

class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
    this.previous = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addToTail(val) {
    let newTail = new Node(val);
    if (!this.tail) {
      this.head = newTail;
      this.tail = newTail;
      this.length++;
    } else {
      let oldTail = this.tail;
      this.tail = newTail;
      oldTail.next = newTail;
      newTail.previous = oldTail;
      this.length++;
    }
    return this;
  }

  removeTail() {
    if (this.tail) {
      let oldTail = this.tail;
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
        this.length--;
        return oldTail;
      } else {
        let newTail = oldTail.previous;
        this.tail = newTail;
        this.length--;
        return oldTail;
      }
    }
    return undefined;
  }

  addToHead(val) {
    let newHead = new Node(val);
    if (!this.head) {
      this.head = newHead;
      this.tail = this.head;
      this.length++;
    } else {
      let oldHead = this.head;
      this.head = newHead;
      newHead.next = oldHead;
      oldHead.previous = newHead;
      this.length++;
    }
    return this;
  }

  removeHead() {
    if (this.head) {
      let oldHead = this.head;
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
        this.length--;
        return oldHead;
      }
      let newHead = oldHead.next;
      this.head = newHead;
      this.head.previous = null;
      this.length--;
      return oldHead;
    }
    return undefined;
  }

  contains(target) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === target) return true;
      currentNode = currentNode.next;
    }
    return false;
  }

  get(index) {
    if (index < 0 || index > this.length) return null;
    let count = 0;
    let currentNode = this.head;
    while (count !== index) {
      currentNode = currentNode.next;
      count++;
    }
    return currentNode;
  }

  set(index, val) {
    let result = this.get(index);
    if (result) {
      result.value = val;
      return true;
    }
    return false;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.addToTail(val);
    if (index === 0) return !!this.addToHead(val);

    let newNode = new Node(val);
    let prevNode = this.get(index - 1);
    let shiftNode = prevNode.next;

    shiftNode.previous = newNode;
    prevNode.next = newNode;
    newNode.next = shiftNode;
    newNode.previous = prevNode;

    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index > this.length) return undefined;
    if (index === this.length) return this.removeTail();
    if (index === 0) return this.removeHead();

    let prevNode = this.get(index - 1);
    let removed = prevNode.next;
    let inFrontOfRemoved = removed.next;

    prevNode.next = inFrontOfRemoved;
    inFrontOfRemoved.previous = prevNode;

    this.length--;
    return removed;
  }

  size() {
    return this.length;
  }
}

let newList = new LinkedList();
newList.addToHead("First Addition");
newList.addToHead("Second Addition");
newList.addToTail("Third Addition");
newList.addToTail("Fourth Addition");
newList.insert(1, "Fifth Addition");

fs.writeFileSync(
  "test.txt",
  util.inspect(newList, { showHidden: true, depth: Infinity })
);
