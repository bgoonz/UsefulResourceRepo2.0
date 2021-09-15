class HanoiGame {
  constructor(towers = [[3, 2, 1], [], []]) {
    this.towers = towers;
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    const startTower = this.towers[startTowerIdx];
    const endTower = this.towers[endTowerIdx];

    // if the starting tower is empty or the end index is larger than our board
    if (endTower === undefined || startTower === undefined || startTower.length === 0) {
      return false;
      // if the ending tower is empty
    } else if (endTower.length === 0) {
      return true;
    } else {
      const topStartDisc = startTower[startTower.length - 1];
      const topEndDisc = endTower[endTower.length - 1];
      // ensure the start disk is smaller that the disk it will be placed upon
      return topStartDisc < topEndDisc;
    }
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      let endTower = this.towers[endTowerIdx];
      let startTower = this.towers[startTowerIdx];

      endTower.push(startTower.pop());
      return true;
    } else {
      return false;
    }
  }

  isWon() {
    return this.towers[2].length === 3 || this.towers[1].length === 3;
  }

  print() {
    console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
    this.print();
    reader.question("Enter a starting tower: ", start => {
      const startTowerIdx = parseInt(start);
      reader.question("Enter an ending tower: ", end => {
        const endTowerIdx = parseInt(end);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  run(reader, callback) {
    // we will prompt our user to provide a start and stop index using
    // a readline interface
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // Continue to play!
        this.run(reader, callback);
      } else {
        this.print();
        console.log("You win!");
        callback();
      }
    });
  }
}

module.exports = HanoiGame;
