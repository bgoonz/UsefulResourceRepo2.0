const Board = require('./board');

class BattleshipGame {
  constructor(player1, numRows, numCols, numShips) {
    this.player1 = player1;
    this.currentPlayer = player1;
    this.board = new Board(numRows, numCols, numShips);
    this.processMove = this.processMove.bind(this);
    this.turn = 1;
  }

  playTurn() {
    this.displayStatus();
    this.currentPlayer.getMove(this.processMove);
  }

  processMove(pos) {
    if (this.board.isValidMove(pos)) {
      this.board.attack(pos);
      if (this.board.isGameOver()) {
        this.displayStatus();
        this.currentPlayer.processGameOver(true, this.turn);
      } else {
        this.turn++;
        this.playTurn();
      }
    } else {
      console.log('Please input a valid position.');
      this.currentPlayer.getMove(this.processMove);
    }
  }

  displayStatus() {
    console.log('\n*******************************')
    console.log("'h' means hit, 'x' means no-hit\n");
    console.log(this.board.display());
  }
}

module.exports = BattleshipGame;
