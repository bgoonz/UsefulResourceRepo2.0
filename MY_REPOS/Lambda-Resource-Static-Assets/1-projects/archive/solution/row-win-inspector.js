export class RowWinInspector {
  constructor(columns) {
    this.columns = columns;
  }

  inspect() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
      const entry1 = this.columns[0].getTokenAt(rowIndex);
      const entry2 = this.columns[1].getTokenAt(rowIndex);
      const entry3 = this.columns[2].getTokenAt(rowIndex);
      const entry4 = this.columns[3].getTokenAt(rowIndex);

      if (
        entry1 === entry2 &&
        entry2 === entry3 &&
        entry3 == entry4 &&
        entry1 !== undefined &&
        entry1 !== null
      ) {
        return entry1;
      }
    }
    return 0;
  }
}
