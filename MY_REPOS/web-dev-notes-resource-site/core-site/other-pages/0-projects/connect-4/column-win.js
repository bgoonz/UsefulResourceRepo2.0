import { Game } from './game.js';

export class ColumnWinInspector {
    constructor(column) {
        this.column = column;
    }

    inspect() {
        for (let i = this.column.rowArr.length - 1; i >= 0; i--) {
            if (this.column.getTokenAt(i) !== null) {
                if ((this.column.getTokenAt(i) === this.column.getTokenAt(i - 1)) && (this.column.getTokenAt(i) === this.column.getTokenAt(i - 2)) && (this.column.getTokenAt(i) === this.column.getTokenAt(i - 3))) {
                    return this.column.getTokenAt(i);
                }
            }
        }
        return 0;

    }
}
