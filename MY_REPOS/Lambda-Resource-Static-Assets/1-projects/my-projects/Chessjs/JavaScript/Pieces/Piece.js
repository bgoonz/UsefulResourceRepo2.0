const Piece = function () {};

Piece.prototype.movePaths = [];
Piece.prototype.setCurrentPosition = function (currentPosition) {
  this.currentPosition = currentPosition;
};
