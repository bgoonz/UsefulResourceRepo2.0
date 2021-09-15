const UserInterface = (UF => ({
    setSquareColor({row, column}) {
        square = document.getElementById(`row-${row}-column-${column}`);
        if (( (row % 2 === 1) && (column % 2 === 0)) ||
            ((row % 2 === 0) && (column % 2 === 1)) ) {
            square.style.background = "#7E757B";
        }
        else {
            square.style.background = "";
        }
    },

    highlightSquare({row, column}) {
        document.getElementById(`row-${row}-column-${column}`).style.background = "#4CAF50";
    },

    resetSquareColors() {
        document.querySelectorAll('.square').forEach(square => {
            squareData = UF.parseSquare(square);
            UserInterface.setSquareColor(squareData);
        });
    },

    setSquareText({row, column}, text) {
        square = document.getElementById(`row-${row}-column-${column}`);
        square.innerHTML = text;
    }
}))(UtilityFunctions);