// 3.5. Sort Stacks:
// Write a program to sort a stack such that the smallest items are on the top. You can use an additional temporary
// stack, but you may not copy the elements into any other data structure (such as an array). The stack supports the
// following operations: push, pop, peek, and isEmpty.
//
// Solution:
// We use a temporary stack and use it to move elements from input stack.
// Once we encounter an element from input stack that is smaller element at the top of the tempStack, we then move all // the elements back to the original stack. We insert that single element, and then start popping all elements from
// the original stack.
// At the end, we are left with a temporary stack that is sorted in ascending order, so we need to pop all elements
// into input stack.

class Stack {
  constructor(capacity) {
    this._capacity = capacity || Infinity;
    this._storage = {};
    this._count = 0;
  }

  sort() {
    var tempStack = new Stack();

    while (!this.isEmpty()) {
      //pop out the first element
      let top = this.pop();

      //as long as elements of tempStack > top element of current stack, we need to move all elements from tempStack into original stack
      while (!tempStack.isEmpty() && tempStack.peek() > top) {
        //pop next element to compare to current elements in tempStack
        this.push(tempStack.pop());
      }

      //move this into temp stack
      tempStack.push(top);
    }

    //Right now tempStack is sorted in ascending order, we need to
    //pop everything back into input stack in order so that smallest elements are on top
    while (!tempStack.isEmpty()) {
      this.push(tempStack.pop());
    }
  }

  push(element) {
    //console.log(this._count);
    if (this._count < this._capacity) {
      this._storage[this._count++] = element;
    } else {
      return "Capacity is full.";
    }
  }

  pop() {
    if (this._count === 0) {
      return "Stack is empty.";
    }
    let top = this._storage[this._count - 1];
    delete this._storage[this._count - 1];
    this._count--;
    if (this._count < 0) {
      this._count = 0;
    }

    return top;
  }

  peek() {
    return this._storage[this._count - 1];
  }

  count() {
    return this._count;
  }

  isEmpty() {
    //console.log(this);
    return Object.keys(this._storage).length === 0;
  }

  print() {
    let stack = "";
    for (let key in this._storage) {
      stack += " " + this._storage[key];
    }
    console.log(stack);
  }
}

let input = new Stack();
input.push(34);
input.push(3);
input.push(31);
input.push(98);
input.push(92);
input.push(23);
console.log("original");
input.print();
console.log("=======");
input.sort();
console.log("=======");
input.print();
