const Scores = require("./Scoreboard");

class Player {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  wins(points) {
    Scores.update(this.name, points);
  }

  loses(points) {
    Scores.update(this.name, -points);
  }
}

module.exports = Player;
