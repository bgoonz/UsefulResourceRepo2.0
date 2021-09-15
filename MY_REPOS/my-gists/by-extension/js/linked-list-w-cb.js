/* eslint-disable class-methods-use-this */
/* eslint-disable object-shorthand */

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
    // Do not modify anything inside of the constructor
  }

  // Wraps the given value in a node object and adds the node to the tail of the list
  // If the list is empty, the new element is considered the tail as well as the head
  // If there is one element in the list before the new element is added, the new element becomes the tail of the list
  get size() {
    return this.count;
  }

  each(cb) {  // new
    if (this.head === null) return;
    let node = this.head;
    while (node.next !== null) {
      cb(node);
      node = node.next;
    }
  }

  checkForDupes(key, newVal) { // new
    if (this.head === null) return;
    const checkArr = [];
    const searchLinkedList = (node) => {
      if (checkArr.includes(node.value[0])) {
        node.value[1] = newVal;
        return;
      }
      checkArr.push(node.value[0]);
      if (node.next === null) return;
      return searchLinkedList(node.next);
    };
    return searchLinkedList(this.head);
  }

  retrieveValue(key) { // new
    if (this.head === null) return;
    const searchLinkedList = (node) => {
      if (node.value[0] === key) {
        return node.value[1];
      }
      if (node.next === null) return;
      return searchLinkedList(node.next);
    };
    return searchLinkedList(this.head);
  }

  removeKey(key) {
    console.log(' reaching removeKey ');
    if (this.head !== null) {
      if (this.head.value[0] === key) {
        return this.removeHead();
      }
      // find node if node not head
      console.log('uhhh');
      let current = this.head;
      while (current.next !== null) {
        console.log('while');
        if (current.next.value[0] === key) {
          console.log('while if');
          current.next = current.next.next;
          return;
        }
        current = current.next;
      }
    }
  }

  addToTail(value) {
    this.count++;
    const newNode = {
      next: null,
      value: value,
    };

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }

  // Removes the current head node from the list, replacing it with the next element in the list
  // Returns the value of the removed node
  removeHead() {
    this.count--;
    // need to check if there is a head node
    if (this.head === null) return;
    // check if head has a next
    if (this.head.next === null) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      return value;
    }
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }

  // Checks the linked list for the given value
  // Returns true if the the value is found in the list, false otherwise
  //
  // contains(value) {
  //  let node = this.head;
  //  while (node !== null) {
  //    if (node.value === value) return true;
  //    node = node.next;
  //  }
  //  return false;
  // }

  contains(value) {
    // check if the linked list is empty
    if (this.head === null) return false;
    // otherwise, define our recursive function
    const searchLinkedList = (node) => {
      // check if the current node's value matches what we're looking for
      if (node.value === value) return true;
      // check if we've reached the end of the linked list
      if (node.next === null) return false;
      // make our recursive call
      return searchLinkedList(node.next);
    };
    return searchLinkedList(this.head);
  }
}

module.exports = LinkedList;
