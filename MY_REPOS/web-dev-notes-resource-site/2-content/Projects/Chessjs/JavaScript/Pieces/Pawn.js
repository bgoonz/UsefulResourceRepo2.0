var Pawn = function(color, currentPosition) {
	this.color = color;
	this.currentPosition = currentPosition;
};
Pawn.prototype = new Piece();
Pawn.prototype.setIcon = function() {
	if (this.color === 'w') {
		this.icon = '&#9817';
	} else if (this.color === 'b') {
		this.icon = '&#9823';
	}
}
Pawn.prototype.getMovePaths = function() {
	var moveMarchForward, moveDiagonalKillRight, moveDiagonalKillLeft;
	this.movePaths = [];
	if (this.color === 'w') {
		// march forward
		moveMarchForward = {row: this.currentPosition.row - 1, column: this.currentPosition.column}
		if (this.currentPosition.row !== 0) this.movePaths.push(moveMarchForward);

		// right diagonal kill
		moveDiagonalKillRight = {row: this.currentPosition.row - 1, column:this.currentPosition.column + 1}
		if (this.currentPosition.row !== 0 && this.currentPosition.column !== 7) this.movePaths.push(moveDiagonalKillRight);

		// left diagonal kill
		moveDiagonalKillLeft = {row: this.currentPosition.row - 1, column:this.currentPosition.column - 1}
		if (this.currentPosition.row !== 0 && this.currentPosition.column !== 0) this.movePaths.push(moveDiagonalKillLeft);

		// first move two squares
		if (this.currentPosition.row === 6) this.movePaths.push({row: this.currentPosition.row-2, column: this.currentPosition.column});
	}
	else {
		// march forward
		moveMarchForward = {row: this.currentPosition.row + 1, column: this.currentPosition.column}
		if (this.currentPosition.row !== 7) this.movePaths.push(moveMarchForward);

		// right diagonal kill
		moveDiagonalKillRight = {row: this.currentPosition.row + 1, column:this.currentPosition.column - 1}
		if (this.currentPosition.row !== 7 && this.currentPosition.column != 0) this.movePaths.push(moveDiagonalKillRight);

		// left diagonal kill
		moveDiagonalKillLeft = {row: this.currentPosition.row + 1, column:this.currentPosition.column + 1}
		if (this.currentPosition.row !== 7 && this.currentPosition.column != 7) this.movePaths.push(moveDiagonalKillLeft);

		// first move two squares
		if (this.currentPosition.row === 1) this.movePaths.push({row: this.currentPosition.row + 2, column: this.currentPosition.column});
	}
	return this.movePaths;

}