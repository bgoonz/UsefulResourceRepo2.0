const UserInterface = (function (UF) {
  return {
    setSquareColor: function (squareData) {
      square = document.getElementById(
        "row-" + squareData.row + "-column-" + squareData.column
      );
      if (
        (squareData.row % 2 === 1 && squareData.column % 2 === 0) ||
        (squareData.row % 2 === 0 && squareData.column % 2 === 1)
      ) {
        square.style.background = "#7E757B";
      } else {
        square.style.background = "";
      }
    },

    highlightSquare: function (squareData) {
      document.getElementById(
        "row-" + squareData.row + "-column-" + squareData.column
      ).style.background = "#4CAF50";
    },

    resetSquareColors: function () {
      document.querySelectorAll(".square").forEach(function (square) {
        squareData = UF.parseSquare(square);
        UserInterface.setSquareColor(squareData);
      });
    },

    setSquareText: function (squareData, text) {
      square = document.getElementById(
        "row-" + squareData.row + "-column-" + squareData.column
      );
      square.innerHTML = text;
    },
  };
})(UtilityFunctions);
