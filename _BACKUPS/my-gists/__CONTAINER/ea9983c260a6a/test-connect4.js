//col class

export class Column {
    constructor(columnSquares, currentColor) {
        this.counter = 5;
        this.columnSquares = columnSquares;
        this.currentColor = currentColor;
        this.rowArr = [null, null, null, null, null, null];
    }

    add(playerTurn) {
        // this.rowArr.unshift(playerTurn);
        for (let i = 5; i >= 0; i--) {
            if (this.rowArr[i] === null) {
                this.rowArr[i] = playerTurn;
                break;
            }
        }
    }

    getTokenAt(index) {
        // if (this.rowArr[index] === 1) {
        //     return 1;
        // }
        // else if (this.rowArr[index] === 2) {
        //     return 2;
        // }
        // else {
        //     return null;
        // }
        return this.rowArr[index];
    }

    isFull() {
        for (let i = 0; i < this.rowArr.length; i++) {
            if (this.rowArr[i] === null) {
                return false;
            }
        }
        return true;
    }
}