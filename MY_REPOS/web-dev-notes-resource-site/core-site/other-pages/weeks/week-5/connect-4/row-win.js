export class RowWinInspector {
    constructor(columns) {
        this.column = columns;
    }
    // this.column = [{} {} {} {}]

    // arr[i][j]

    //column = [1, 2, 3, 4]
    /*
    [*][*][*][*]
    [*][*][*][*]
    [*][*][*][*]
    [*][*][*][*]
    [*][*][*][*]
    */
    inspect() {
        for (let i = 5; i >= 0; i--) {
            if (this.column[0].getTokenAt(i) !== null) {
                if ((this.column[0].getTokenAt(i) === this.column[1].getTokenAt(i)) && (this.column[0].getTokenAt(i) === this.column[2].getTokenAt(i)) && (this.column[0].getTokenAt(i) === this.column[3].getTokenAt(i))) {
                    return this.column[0].getTokenAt(i);
                }
            }
        }
        return 0;
    }
}
