import { Column } from './column.js';
import { ColumnWinInspector } from './column-win-inspector.js';
import { RowWinInspector } from './row-win-inspector.js';
import { DiagonalWinInspector } from './diagonal-win-inspector.js';

export class Game {
  constructor(player1Name, player2Name) {
    this.columns = [
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
    ];
    this.currentPlayer = 1;
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.winnerNumber = 0;
  }

  checkForColumnWin() {
    if (this.winnerNumber > 0) return;

    for (let column of this.columns) {
      const inspector = new ColumnWinInspector(column);
      const winnerNumber = inspector.inspect();
      if (winnerNumber > 0) {
        this.winnerNumber = winnerNumber;
        break;
      }
    }
  }

  checkForDiagonalWin() {
    if (this.winnerNumber > 0) return;

    for (let columnIndex = 0; columnIndex < 4; columnIndex += 1) {
      const slice = this.columns.slice(columnIndex, columnIndex + 4);
      const inspector = new DiagonalWinInspector(slice);
      const winnerNumber = inspector.inspect();
      if (winnerNumber > 0) {
        this.winnerNumber = winnerNumber;
        break;
      }
    }
  }

  checkForRowWin() {
    if (this.winnerNumber > 0) return;

    for (let columnIndex = 0; columnIndex < 4; columnIndex += 1) {
      const slice = this.columns.slice(columnIndex, columnIndex + 4);
      const inspector = new RowWinInspector(slice);
      const winnerNumber = inspector.inspect();
      if (winnerNumber > 0) {
        this.winnerNumber = winnerNumber;
        break;
      }
    }
  }

  checkForTie() {
    if (this.columns.every(x => x.isFull())) {
      this.winnerNumber = 3;
    }
  }

  getName() {
    if (this.winnerNumber === 1) {
      return `${this.player1Name} wins!`;
    }
    if (this.winnerNumber === 2) {
      return `${this.player2Name} wins!`;
    }
    if (this.winnerNumber === 3) {
      return `${this.player1Name} ties with ${this.player2Name}!`
    }
    return `${this.player1Name} vs. ${this.player2Name}`;
  }

  getTokenAt(rowIndex, columnIndex) {
    return this.columns[columnIndex].getTokenAt(rowIndex);
  }

  isColumnFull(columnIndex) {
    if (this.winnerNumber > 0) return true;

    return this.columns[columnIndex].isFull();
  }

  playInColumn(columnIndex) {
    this.columns[columnIndex].add(this.currentPlayer);

    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }

    this.checkForTie();
    this.checkForColumnWin();
    this.checkForRowWin();
    this.checkForDiagonalWin();
  }
}
