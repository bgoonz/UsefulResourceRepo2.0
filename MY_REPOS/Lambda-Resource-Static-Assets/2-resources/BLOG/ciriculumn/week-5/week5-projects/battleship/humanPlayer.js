const readline = require('readline');
const { ALPHABET } = require('./util');

class HumanPlayer {
  constructor() {
    this.rl = readline.createInterface(process.stdin, process.stdout);
  }

  getMove(processMove) {
    this.rl.question('Choose a coordinate to hit, (e.g. A, 0)\n> ', (answer) => {
      let [row, col] = answer.split(',');
      row = ALPHABET.indexOf(row);
      col = Number(col);
      processMove([row, col]);
    });
  }

  processGameOver(isWon, turn) {
    if (isWon) {
      console.log(`Congratulations! You won in ${turn} turns!`);
    } else {
      console.log('You Lost');
    }
    this.rl.close();
  }
}

module.exports = HumanPlayer;
