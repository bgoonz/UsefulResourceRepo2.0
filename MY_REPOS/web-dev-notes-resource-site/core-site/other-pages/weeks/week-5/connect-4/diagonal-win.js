export class DiagonalWinInspector {
    constructor(columns) {
        this.column = columns;
    }

    /*
        [*][*][*][*]
        [*][*][*][*]
        [*][*][*][*]
        [*][*][*][*]
        [*][*][*][*]
    */

    inspect() {
        for (let i = 5; i >= 3; i--) {
            if (this.column[0].getTokenAt(i) !== null) {
                if ((this.column[0].getTokenAt(i) === this.column[1].getTokenAt(i - 1)) && (this.column[0].getTokenAt(i) === this.column[2].getTokenAt(i - 2)) && (this.column[0].getTokenAt(i) === this.column[3].getTokenAt(i - 3))) {
                    return this.column[0].getTokenAt(i);
                }
            }
        }

        for (let i = 2; i >= 0; i--) {
            if (this.column[0].getTokenAt(i) !== null) {
                if ((this.column[0].getTokenAt(i) === this.column[1].getTokenAt(i + 1)) && (this.column[0].getTokenAt(i) === this.column[2].getTokenAt(i + 2)) && (this.column[0].getTokenAt(i) === this.column[3].getTokenAt(i + 3))) {
                    return this.column[0].getTokenAt(i);
                }
            }
        }
        return 0;
    }
}
