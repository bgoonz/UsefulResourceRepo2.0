//We create 2 stacks one for enqueue and one for dequeue.
//Once dequeue stack is empty, we pull all elements from enqueue stack onto dequeue stack;
class MyQueue {
  constructor(capacity) {
    this._capacity = capacity || Infinity;
    this._dequeue = [];
    this._enqueue = [];
  }

  enqueue(element) {
    if (this._enqueue.length < this._capacity) {
      this._enqueue.push(element);
      return;
    }
    return "Queue capacity is full.";
  }

  dequeue() {
    if (this._dequeue.length <= 0) {
      while (this._enqueue > 0) {
        this._dequeue.push(this._enqueue[0]);
        this._enqueue.shift();
      }
    }
    this._dequeue.shift();
  }

  peek() {
    if (this._dequeue.length <= 0) {
      if (this._enqueue.length > 0) {
        return this._enqueue[0];
      }
      return "Queue is empty";
    }

    return this._dequeue[0];
  }

  count() {
    return this._enqueue.length + this._dequeue.length;
  }

  contains(element) {
    for (let i = 0; i < this._enqueue.length; i++) {
      if (this._enqueue[i] === element) return true;
    }
    for (let i = 0; i < this._dequeue.length; i++) {
      if (this._dequeue[i] === element) return true;
    }

    return false;
  }
}
