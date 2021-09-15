const Bishop = function (color, currentPosition) {
  this.color = color;
  this.currentPosition = currentPosition;
};

Bishop.prototype = new Piece();
Bishop.prototype.setIcon = function () {
  if (this.color === "w") {
    this.icon = "&#9815";
  } else if (this.color === "b") {
    this.icon = "&#9821";
  }
};
Bishop.prototype.getMovePaths = function () {
  let currentRow;
  let currentColumn;
  this.movePaths = [];
  // move in upper right diagonal
  moveUpRight = [];
  this.movePaths.push(moveUpRight);
  for (
    currentColumn = this.currentPosition.column + 1,
      currentRow = this.currentPosition.row - 1;
    currentColumn <= 7 && currentRow >= 0;
    currentColumn++, currentRow--
  ) {
    moveUpRight.push({ row: currentRow, column: currentColumn });
  }
  // move in lower right diagonal
  moveDownRight = [];
  this.movePaths.push(moveDownRight);
  for (
    currentColumn = this.currentPosition.column + 1,
      currentRow = this.currentPosition.row + 1;
    currentColumn <= 7 && currentRow <= 7;
    currentColumn++, currentRow++
  ) {
    moveDownRight.push({ row: currentRow, column: currentColumn });
  }
  // move up left
  moveUpLeft = [];
  this.movePaths.push(moveUpLeft);
  for (
    currentColumn = this.currentPosition.column - 1,
      currentRow = this.currentPosition.row - 1;
    currentColumn >= 0 && currentRow >= 0;
    currentColumn--, currentRow--
  ) {
    moveUpLeft.push({ row: currentRow, column: currentColumn });
  }
  // move down left
  moveDownLeft = [];
  this.movePaths.push(moveDownLeft);
  for (
    currentColumn = this.currentPosition.column - 1,
      currentRow = this.currentPosition.row + 1;
    currentColumn >= 0 && currentRow <= 7;
    currentColumn--, currentRow++
  ) {
    moveDownLeft.push({ row: currentRow, column: currentColumn });
  }

  return this.movePaths;
};
