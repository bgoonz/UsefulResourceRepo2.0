const UtilityFunctions = (() => ({
    parseSquare(square) {
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
            row,
            column,
        };
    },

    isMoveInsideBoard({row, column}) {
        if (row <= 7 && column <= 7 && row >= 0 && column >= 0) {		
            return true;
        }
        else return false;
    }
}))();