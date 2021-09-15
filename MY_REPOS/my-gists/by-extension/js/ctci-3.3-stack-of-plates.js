class StackOfPlates {
  constructor(capacity) {
    if (!capacity) {
      return "Specify plate capacity. Cannot be created"; //
    }
    this._capacity = capacity;
    this._storage = [[]]; //Each array represents a set of plates
  }

  getLastStack() {
    return this._storage[this._storage.length - 1];
  }

  push(element) {
    if (this.getLastStack().length >= this._capacity) {
      this._storage.push([]); //create new column;
    }
    this.getLastStack().push(element);
  }

  pop() {
    let lastStack = this.getLastStack;
    let element = lastStack().pop();
    if (lastStack().length === 0 && lastStack().length >= 1) {
      this._storage.pop();
    }

    return element;
  }

  popAt(position) {
    let count = 0;

    for (let i = 0; i < this._storage.length; i++) {
      for (let j = 0; j < this._storage[i].length; j++) {
        count++;
        if (count === position) {
          let next;
          let lastElement = count();
          if (this._storage[i][j + 1] && position < lastElement) {
            next = this._storage[i][j + 1];
          } else if (!this._storage[i][j + 1] && position !== lastElement) {
            next = this._storage[i + 1][0];
          }
          this._storage[i].splice(j, 1, next);
        }
      }
    }
  }

  peek() {
    return this.getLastStack()[this.getLastStack().length - 1];
  }

  count() {
    let m = this._storage.length() - 1; //num of rows - 1;
    let n = 0,
      remainder = 0;
    if (m > 1) {
      n = this._storage[this._storage.length - 2].length;
    }
    remainder = this.getLastStack().length;
    return m * n + remainder;
  }
}
