class Rook extends Piece {
    constructor(color, currentPosition) {
        this.color = color;
        this.currentPosition = currentPosition;
    }

    setIcon() {
        if (this.color === 'w') {
            this.icon = '&#9814';
        } else if (this.color === 'b') {
            this.icon = '&#9820';
        }
    }

    getMovePaths() {
        this.movePaths = [];
        // move right
        moveRight = [];
        this.movePaths.push(moveRight);
        for(var column = this.currentPosition.column + 1; column <= 7; column++) {
            moveRight.push({row: this.currentPosition.row, column});
        }

        // move left
        moveLeft = [];
        this.movePaths.push(moveLeft);
        for(var column = this.currentPosition.column - 1; column >= 0 ; column--) {
            moveLeft.push({row: this.currentPosition.row, column});
        }

        // move up
        moveUp = [];
        this.movePaths.push(moveUp);
        for(var row = this.currentPosition.row - 1; row >= 0 ; row--) {
            moveUp.push({row, column: this.currentPosition.column});
        }

        // move down
        moveDown = [];
        this.movePaths.push(moveDown);
        for(var row = this.currentPosition.row + 1; row <= 7; row++) {
            moveDown.push({row, column: this.currentPosition.column});
        }
        return this.movePaths;

    }
}