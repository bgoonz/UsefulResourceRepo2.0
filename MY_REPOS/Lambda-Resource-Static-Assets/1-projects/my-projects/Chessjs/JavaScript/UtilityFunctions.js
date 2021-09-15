const UtilityFunctions = (function () {
  return {
    parseSquare: function (square) {
      let id;
      let row;
      let column;
      let piece;
      let splitId;
      id = square.id;
      splitId = id.split("-");
      row = parseInt(splitId[1]);
      column = parseInt(splitId[3]);
      return {
        row: row,
        column: column,
      };
    },

    isMoveInsideBoard: function (moveData) {
      if (
        moveData.row <= 7 &&
        moveData.column <= 7 &&
        moveData.row >= 0 &&
        moveData.column >= 0
      ) {
        return true;
      } else return false;
    },
  };
})();
