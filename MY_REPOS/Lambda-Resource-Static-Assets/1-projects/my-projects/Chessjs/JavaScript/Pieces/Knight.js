const Knight = function (color, currentPosition) {
  this.color = color;
  this.currentPosition = currentPosition;
};

Knight.prototype = new Piece();
Knight.prototype.setIcon = function () {
  if (this.color === "w") {
    this.icon = "&#9816";
  } else if (this.color === "b") {
    this.icon = "&#9822";
  }
};
Knight.prototype.getMovePaths = function () {
  this.movePaths = [];
  let move1;
  let move2;
  let move3;
  let move4;
  let move5;
  let move6;
  let move7;
  let move8;
  // MOVE 1
  path1 = [];
  this.movePaths.push(path1);
  move1 = {
    row: this.currentPosition.row - 1,
    column: this.currentPosition.column + 2,
  };
  if (UtilityFunctions.isMoveInsideBoard(move1)) {
    path1.push(move1);
  }
  // MOVE 2
  path2 = [];
  this.movePaths.push(path2);
  move2 = {
    row: this.currentPosition.row - 2,
    column: this.currentPosition.column + 1,
  };
  if (UtilityFunctions.isMoveInsideBoard(move2)) {
    path2.push(move2);
  }
  // MOVE 3
  path3 = [];
  this.movePaths.push(path3);
  move3 = {
    row: this.currentPosition.row - 2,
    column: this.currentPosition.column - 1,
  };
  if (UtilityFunctions.isMoveInsideBoard(move3)) {
    path3.push(move3);
  }
  // MOVE 4
  path4 = [];
  this.movePaths.push(path4);
  move4 = {
    row: this.currentPosition.row - 1,
    column: this.currentPosition.column - 2,
  };
  if (UtilityFunctions.isMoveInsideBoard(move4)) {
    path4.push(move4);
  }
  // MOVE 5
  path5 = [];
  this.movePaths.push(path5);
  move5 = {
    row: this.currentPosition.row + 1,
    column: this.currentPosition.column - 2,
  };
  if (UtilityFunctions.isMoveInsideBoard(move5)) {
    path5.push(move5);
  }
  // MOVE 6
  path6 = [];
  this.movePaths.push(path6);
  move6 = {
    row: this.currentPosition.row + 2,
    column: this.currentPosition.column - 1,
  };
  if (UtilityFunctions.isMoveInsideBoard(move6)) {
    path6.push(move6);
  }
  // MOVE 7
  path7 = [];
  this.movePaths.push(path7);
  move7 = {
    row: this.currentPosition.row + 2,
    column: this.currentPosition.column + 1,
  };
  if (UtilityFunctions.isMoveInsideBoard(move7)) {
    path7.push(move7);
  }
  // MOVE 8
  path8 = [];
  this.movePaths.push(path8);
  move8 = {
    row: this.currentPosition.row + 1,
    column: this.currentPosition.column + 2,
  };
  if (UtilityFunctions.isMoveInsideBoard(move8)) {
    path8.push(move8);
  }

  return this.movePaths;
};
