class Queen extends Piece {
    constructor(color, currentPosition) {
        this.color = color;
        this.currentPosition = currentPosition;
    }

    setIcon() {
        if (this.color === 'w') {
            this.icon = '&#9813';
        } else if (this.color === 'b') {
            this.icon = '&#9819';
        }
    }

    getMovePaths(squareData, board) {
        this.movePaths = [];
        Rook.prototype.getMovePaths.call(this);
        const rookMovePaths = this.movePaths;
        Bishop.prototype.getMovePaths.call(this);
        this.movePaths = this.movePaths.concat(rookMovePaths);

        return this.movePaths;
    }
}