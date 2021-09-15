const { ALPHABET } = require('./util');

class Board {
  constructor(numRows, numCols, numShips) {
    this._numRows = numRows;
    this._numCols = numCols;
    this.populateGrid(numShips);
  }

  isGameOver() {
    return this.count() === 0;
  }

  count() {
    let numShipsLeft = 0;
    this._forEach((space) => {
      if (space === 's') numShipsLeft++;
    });
    return numShipsLeft;
  }

  populateGrid(numShips) {
    const grid = [];
    for (let i = 0; i < this._numRows; i++) {
      grid.push(Array(this._numCols).fill(null));
    }

    let [row, col] = this._randomPos();
    while (numShips) {
      while (grid[row][col]) {
        [row, col] = this._randomPos();
      }
      grid[row][col] = 's';
      numShips--;
    }

    this.grid = grid;
  }

  isValidMove(pos) {
    const [row, col] = pos;

    const isPositionOutOfBounds = row < 0
      || row >= this._numRows
      || col < 0
      || col >= this._numCols;

    const isPreviouslyMadeMove = this.grid[row][col] === 'h'
      || this.grid[row][col] === 'x';

    if (isPositionOutOfBounds || isPreviouslyMadeMove) return false;

    return true;
  }

  attack(pos) {
    const [row, col] = pos;
    const space = this.grid[row][col];
    if (space === 's') {
      this.grid[row][col] = 'h';
    } else if (space === null) {
      this.grid[row][col] = 'x';
    }
  }

  display() {
    let printStr = '   ' + this.grid[0].map((_, col) => col).join(' ');
    printStr += '\n';
    printStr += '  ' + '--'.repeat(this._numCols) + '-';
    printStr += '\n';

    let rowStr = '|';

    const forEachCol = (space) => {
      if (space && space !== 's') {
        rowStr += space;
      } else {
        rowStr += ' ';
      }
      rowStr += '|';
    };

    const afterEachRow = (_, row) => {
      printStr += ALPHABET[row] + ' ' + rowStr;
      printStr += '\n';
      printStr += '  ' + '--'.repeat(this._numCols) + '-';
      printStr += '\n'
      rowStr = '|';
    };

    this._forEach(forEachCol, afterEachRow);
    return printStr;
  }

  _forEach(colCb, rowCb) {
    // rowCb is optional
    for (let i = 0; i < this._numRows; i++) {
      for (let j = 0; j < this._numCols; j++) {
        colCb(this.grid[i][j], [i, j]);
      }
      if (rowCb) rowCb(this.grid[i], i);
    }
  }

  _randomPos() {
    const row = Math.floor(Math.random() * this._numRows);
    const col = Math.floor(Math.random() * this._numCols);
    return [row, col];
  }
}

module.exports = Board;
