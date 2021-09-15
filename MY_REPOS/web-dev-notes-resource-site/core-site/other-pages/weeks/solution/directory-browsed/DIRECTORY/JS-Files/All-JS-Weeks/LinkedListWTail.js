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

  addToTail(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++
    return newNode;
  }

  removeTail() {
    if (!this.head) return null;

    let currentNode = this.head;
    let newTail = currentNode;

    while (currentNode.next) {
      newTail = currentNode;
      currentNode = currentNode.next
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--

    if (!this.length) {
      this.head = null;
      this.tail = null;
    }
    return currentNode;
  }

  addToHead(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let currentNode = this.head;
      this.head = newNode;
      this.head.next = currentNode;
    }
    this.length++
    return this.head;
  }

  removeHead() {
    if (!this.head) return null;

    let currentNode = this.head;
    this.head = currentNode.next;
    this.length--

    if (!this.length) {
      this.head = null;
      this.tail = null;
    }
    return currentNode;
  }

  contains(target) {
    if (!this.head) return false;

    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === target) {
        return true;
      } 
      currentNode = currentNode.next
    }
    return false;
  }

  get(index) {
    if (index < 0 || index > this.length - 1) return null;

    let currentNode = this.head;
    let counter = 0;

    while (counter < index) {
      currentNode = currentNode.next;
      counter++
    }
    return currentNode
  }

  set(index, val) {
    let currentNode = this.head;
    let counter = 0;

    while (counter < index) {
      currentNode = currentNode.next;
      counter++
    }
    if (currentNode) {
      currentNode.value = val;
      return true;
    }
    return false;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return false;

    let newNode = new Node(val);

    let currentNode = this.head;
    let prev;
    let counter = 0;

    while (counter < index) {
      prev = currentNode;
      currentNode = currentNode.next;
      counter++
    }
    let temp = prev.next;
    prev.next = newNode;
    newNode.next = temp;
    this.length++
    return true;
  }

  remove(index) {
    if (index < 0 || index > this.length) return null;

    let currentNode = this.head;
    let prev;
    let counter = 0;

    while (counter < index) {
      prev = currentNode;
      currentNode = currentNode.next;
      counter++
    }

    let removed = prev.next;
    prev.next = remove.next;
    this.length--
    
    return removed;
  }
}