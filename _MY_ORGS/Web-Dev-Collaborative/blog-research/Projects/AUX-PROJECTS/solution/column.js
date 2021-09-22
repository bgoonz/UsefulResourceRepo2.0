export class Column {
  constructor() {
    this.tokens = [];
  }

  add(playerNumber) {
    if (!this.isFull()) {
      this.tokens.push(playerNumber);
    }
  }

  getTokenAt(rowIndex) {
    return this.tokens[5 - rowIndex];
  }

  isFull() {
    return this.tokens.length === 6;
  }
}

/* Alternative implementation of the Column class

export class Column {
  constructor() {
    this.numberOfTokens = 0;
    this.tokens = [null, null, null, null, null, null];
  }

  add(playerNumber) {
    if (this.isFull()) return;

    for (let i = 5; i >= 0; i -= 1) {
      if (this.tokens[i] === null) {
        this.tokens[i] = playerNumber;
        this.numberOfTokens += 1;
        break;
      }
    }
  }

  getTokenAt(rowIndex) {
    return this.tokens[rowIndex];
  }

  isFull() {
    return this.numberOfTokens === 6;
  }
}

*/
