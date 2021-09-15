export class ColumnWinInspector {
  constructor(column) {
    this.column = column;
  }

  inspect() {
    for (let rowIndex = 5; rowIndex > 2; rowIndex -= 1) {
      const bottomValue = this.column.getTokenAt(rowIndex);
      if (bottomValue === null) return 0;
      let weHaveAWinner = true;

      for (let delta = 1; delta < 4; delta += 1) {
        const above = this.column.getTokenAt(rowIndex - delta);
        if (above === null) return 0;
        if (above !== bottomValue) weHaveAWinner = false;
      }

      if (weHaveAWinner) {
        return bottomValue;
      }
    }
    return 0;
  }
}
