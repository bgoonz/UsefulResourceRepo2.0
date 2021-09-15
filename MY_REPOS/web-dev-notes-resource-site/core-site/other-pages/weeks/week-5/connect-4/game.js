import { Column } from "./column.js";
import { ColumnWinInspector } from "./column-win.js";
import { RowWinInspector } from "./row-win.js";
import { DiagonalWinInspector } from "./diagonal-win.js";

export class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.winnerNumber = 0;
        this.column = [
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column()
        ]
    }

    isColumnFull(index) {
        return this.column[index].isFull();
    }

    getName() {
        if (this.winnerNumber === 1) {
            return `${this.player1} WINS!!`;
        }
        else if (this.winnerNumber === 2) {
            return `${this.player2} WINS!!!`;
        }
        else if (this.winnerNumber === 3) {
            return `${this.player1} ties with ${this.player2}`
        }
        return `${this.player1} vs ${this.player2}`;
    }

    getTokenAt(indexI, indexJ) {
        if (this.column[indexI].getTokenAt(indexJ) === 1) {
            return 1;
        }
        else if (this.column[indexI].getTokenAt(indexJ) === 2) {
            return 2;
        }
        else {
            return null;
        }
    }

    checkForTie() {
        if (this.winnerNumber === 0) {
            return this.column.every(function (ele) {
                return ele.isFull();
            });
        }
    }

    checkForColumnWin() {
        if (this.winnerNumber === 0) {
            for (let i = 0; i < this.column.length; i++) {
                let something = new ColumnWinInspector(this.column[i]);
                if (something.inspect() !== 0) {
                    this.winnerNumber = something.inspect();
                }
            }
        }
    }

    checkForDiagonalWin() {
        if (this.winnerNumber === 0) {
            for (let i = 0; i <= 3; i++) {
                let something = new DiagonalWinInspector([this.column[i], this.column[i + 1], this.column[i + 2], this.column[i + 3]]);
                if (something.inspect() !== 0) {
                    this.winnerNumber = something.inspect();
                }
            }
        }
    }

    checkForRowWin() {
        if (this.winnerNumber === 0) {
            for (let i = 0; i <= 3; i++) {
                let something = new RowWinInspector([this.column[i], this.column[i + 1], this.column[i + 2], this.column[i + 3]]);
                if (something.inspect() !== 0) {
                    this.winnerNumber = something.inspect();
                }
            }
        }
    }
}

export class CurrentPlayer extends Game {
    constructor(player1, player2) {
        super(player1, player2);
        this.currentPlayer = 1;
    }

    playInColumn() {
        if (this.currentPlayer === 1) {
            this.currentPlayer = 2;
            // console.log(this.currentPlayer)
        }
        else {
            this.currentPlayer = 1;
            // console.log(this.currentPlayer)

        }
    }

    getTurn() {
        return this.currentPlayer;
    }
}
