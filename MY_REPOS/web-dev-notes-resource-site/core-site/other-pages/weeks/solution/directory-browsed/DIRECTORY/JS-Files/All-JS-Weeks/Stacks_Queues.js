/* 
stored in arrays
values are stored in a node which has 'value' and 'next' properties

Stack: LIFO
top => first node
bottom => last node
length => number of nodes in stack

insertion => push()
deletion => pop()
length => size()

Queue: FIFO
front => first node
back => last node
length => number of nodes in queue

insertion => enqueue()
deletion => dequeue() 
length => size()
*/

class Node {
  constructor(val) {
    this.value = val
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

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

  pop() {
    if (!this.top) return null;

    const temp = this.top;
    
    if (this.top === this.bottom) {
      this.bottom = null;
    }

    this.top = this.top.next;
    this.length--;
    return temp.value;
  }

  size() {
    return this.length;
  }
}

// let stack = new Stack()
// stack.push(1)
// stack.push(2)
// stack.push(3)
// console.log(stack)
// stack.pop()
// stack.pop()
// console.log(stack)
// console.log(stack.size());


class Queue {
  constructor() {
    this.front = null;
    this.back = null;
    this.length = 0;
  }

  enqueue(val) {
    let newNode = new Node(val);
    
    if (!this.front) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }
    return ++this.length
  }

  dequeue() {
    if (!this.front) return null;

    const temp = this.front;
    if (this.front === this.back) {
      this.back = null;
    }
    this.front = this.front.next;
    this.length--;

    return temp.value;
  }

  size() {
    return this.length;
  }
}

let queue = new Queue();
queue.enqueue("a")
queue.enqueue("b")
queue.enqueue("c")
queue.enqueue("d")
console.log(queue)
queue.dequeue()
queue.dequeue()
console.log(queue)
console.log(queue.size());


