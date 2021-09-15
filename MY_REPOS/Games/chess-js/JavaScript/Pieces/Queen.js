var Queen = function(color, currentPosition) {
	this.color = color;
	this.currentPosition = currentPosition;
};

Queen.prototype = new Piece();
Queen.prototype.setIcon = function() {
	if (this.color === 'w') {
		this.icon = '&#9813';
	} else if (this.color === 'b') {
		this.icon = '&#9819';
	}
};
Queen.prototype.getMovePaths = function(squareData, board) {
	this.movePaths = [];
	Rook.prototype.getMovePaths.call(this);
	var rookMovePaths = this.movePaths;
	Bishop.prototype.getMovePaths.call(this);
	this.movePaths = this.movePaths.concat(rookMovePaths);

	return this.movePaths;
}