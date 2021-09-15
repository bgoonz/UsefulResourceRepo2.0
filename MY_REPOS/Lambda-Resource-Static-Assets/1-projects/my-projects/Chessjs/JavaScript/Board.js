const Board = (function () {
  const board = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];

  const isSquareEmpty = function (squareData) {
    return board[squareData.row][squareData.column] === null;
  };

  const isSquareOccupiedByOpponent = function (squareData, color) {
    return (
      board[squareData.row][squareData.column] !== null &&
      board[squareData.row][squareData.column].color !== color
    );
  };

  const validateMoves = function (piece) {
    const validMoves = [];

    // Pawn
    if (piece instanceof Pawn) {
      piece.getMovePaths().forEach(function (move) {
        // if piece moves up in a column
        if (
          move.column === piece.currentPosition.column &&
          move.row < piece.currentPosition.row
        ) {
          for (var i = piece.currentPosition.row - 1; i >= move.row; i--) {
            if (isSquareEmpty({ row: i, column: move.column })) {
              validMoves.push({ row: i, column: move.column });
            } else {
              break;
            }
          }
        }
        // if piece moves down in a column
        if (
          move.column === piece.currentPosition.column &&
          move.row > piece.currentPosition.row
        ) {
          for (var i = piece.currentPosition.row + 1; i <= move.row; i++) {
            if (isSquareEmpty({ row: i, column: move.column })) {
              validMoves.push({ row: i, column: move.column });
            } else {
              break;
            }
          }
        }
        // if piece kills in diagonal
        if (move.column !== piece.currentPosition.column) {
          if (
            isSquareOccupiedByOpponent(
              { row: move.row, column: move.column },
              piece.color
            )
          ) {
            validMoves.push({ row: move.row, column: move.column });
          }
        }
      });
    }

    // Rook, Bishop, King, Queen
    else {
      // console.log(piece.getMovePaths())
      piece.getMovePaths().forEach(function (path) {
        if (path.length > 0) {
          path.every(function (move) {
            if (isSquareEmpty(move)) {
              validMoves.push(move);
              return true;
            } else if (isSquareOccupiedByOpponent(move, piece.color)) {
              validMoves.push(move);
              return false;
            } else {
              return false;
            }
          });
        }
      });
    }
    return validMoves;
  };

  return {
    initializeBoard: function () {
      // White Pawns
      for (var i = 0; i <= 7; i++) {
        pawn = new Pawn("w", { row: 6, column: i });
        pawn.setIcon();
        board[6][i] = pawn;
      }
      // Black Pawns
      for (var i = 0; i <= 7; i++) {
        pawn = new Pawn("b", { row: 1, column: i });
        pawn.setIcon();
        board[1][i] = pawn;
      }
      // White Rooks
      rook = new Rook("w", { row: 7, column: 0 });
      rook.setIcon();
      board[7][0] = rook;
      rook = new Rook("w", { row: 7, column: 7 });
      rook.setIcon();
      board[7][7] = rook;
      // Black Rooks
      rook = new Rook("b", { row: 0, column: 0 });
      rook.setIcon();
      board[0][0] = rook;
      rook = new Rook("b", { row: 0, column: 7 });
      rook.setIcon();
      board[0][7] = rook;
      // White Knights
      knight = new Knight("w", { row: 7, column: 1 });
      knight.setIcon();
      board[7][1] = knight;
      knight = new Knight("w", { row: 7, column: 6 });
      knight.setIcon();
      board[7][6] = knight;
      // Black Knights
      knight = new Knight("b", { row: 0, column: 1 });
      knight.setIcon();
      board[0][1] = knight;
      knight = new Knight("b", { row: 0, column: 6 });
      knight.setIcon();
      board[0][6] = knight;
      // White Bishops
      bishop = new Bishop("w", { row: 7, column: 2 });
      bishop.setIcon();
      board[7][2] = bishop;
      bishop = new Bishop("w", { row: 7, column: 5 });
      bishop.setIcon();
      board[7][5] = bishop;
      // Black Bishops
      bishop = new Bishop("b", { row: 0, column: 2 });
      bishop.setIcon();
      board[0][2] = bishop;
      bishop = new Bishop("b", { row: 0, column: 5 });
      bishop.setIcon();
      board[0][5] = bishop;
      // White Queen
      queen = new Queen("w", { row: 7, column: 3 });
      queen.setIcon();
      board[7][3] = queen;
      // Black Queen
      queen = new Queen("b", { row: 0, column: 3 });
      queen.setIcon();
      board[0][3] = queen;
      // White King
      king = new King("w", { row: 7, column: 4 });
      king.setIcon();
      board[7][4] = king;
      // Black King
      king = new King("b", { row: 0, column: 4 });
      king.setIcon();
      board[0][4] = king;
    },

    getPiece: function (squareData) {
      return board[squareData.row][squareData.column];
    },

    getPossibleMoves: function (squareData) {
      let moves;
      let piece;
      piece = board[squareData.row][squareData.column];
      return validateMoves(piece);
    },

    movePiece: function (fromPosition, toPosition) {
      board[toPosition.row][toPosition.column] =
        board[fromPosition.row][fromPosition.column];
      board[fromPosition.row][fromPosition.column] = null;
      board[toPosition.row][toPosition.column].setCurrentPosition(toPosition);
    },

    board: board,
  };
})();
