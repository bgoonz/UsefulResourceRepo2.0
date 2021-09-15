const Board = (() => {

	const board = [
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null]
	];

	const isSquareEmpty = ({row, column}) => board[row][column] === null;

	const isSquareOccupiedByOpponent = ({row, column}, color) => board[row][column] !== null && board[row][column].color !== color;

	const validateMoves = piece => {
		const validMoves = [];

		// Pawn
		if (piece instanceof Pawn) {
			piece.getMovePaths().forEach(({column, row}) => {
				// if piece moves up in a column
				if (column === piece.currentPosition.column && row < piece.currentPosition.row) {
					for (var i = piece.currentPosition.row - 1; i >= row ; i--) {
						if (isSquareEmpty({row: i, column: column})) {
							validMoves.push({row: i, column: column});
						} else {
							break;
						}
					}
				}
				// if piece moves down in a column
				if (column === piece.currentPosition.column && row > piece.currentPosition.row) {
					for (var i = piece.currentPosition.row + 1; i <= row ; i++) {
						if (isSquareEmpty({row: i, column: column})) {
							validMoves.push({row: i, column: column});
						} else {
							break;
						}
					}
				}
				// if piece kills in diagonal
				if (column !== piece.currentPosition.column) {
					if (isSquareOccupiedByOpponent({row: row, column: column}, piece.color)) {
						validMoves.push({row: row, column: column});
					}
				}

			});
		}

		// Rook, Bishop, King, Queen
		else {
			// console.log(piece.getMovePaths())
			piece.getMovePaths().forEach(path => {
				if (path.length > 0) {
					path.every(move => {
						if(isSquareEmpty(move)) {
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
		initializeBoard() {
			// White Pawns
			for(var i = 0; i <= 7; i++) {
				pawn = new Pawn('w', {row: 6, column: i});
				pawn.setIcon();
				board[6][i] = pawn;
			}
			// Black Pawns
			for(var i = 0; i <= 7; i++) {
				pawn = new Pawn('b', {row: 1, column: i});
				pawn.setIcon();
				board[1][i] = pawn;
			}
			// White Rooks
			rook = new Rook('w', {row: 7, column: 0});
			rook.setIcon();
			board[7][0] = rook;
			rook = new Rook('w', {row: 7, column: 7});
			rook.setIcon();
			board[7][7] = rook;
			// Black Rooks
			rook = new Rook('b', {row: 0, column: 0});
			rook.setIcon();
			board[0][0] = rook;
			rook = new Rook('b', {row: 0, column: 7});
			rook.setIcon();			
			board[0][7] = rook;
			// White Knights
			knight = new Knight('w', {row: 7, column: 1});
			knight.setIcon();
			board[7][1] = knight;
			knight = new Knight('w', {row: 7, column: 6});
			knight.setIcon();
			board[7][6] = knight;
			// Black Knights
			knight = new Knight('b', {row: 0, column: 1});
			knight.setIcon();
			board[0][1] = knight;
			knight = new Knight('b', {row: 0, column: 6});
			knight.setIcon();
			board[0][6] = knight;
			// White Bishops
			bishop = new Bishop('w', {row: 7, column: 2});
			bishop.setIcon();
			board[7][2] = bishop;
			bishop = new Bishop('w', {row: 7, column: 5});
			bishop.setIcon();
			board[7][5] = bishop;
			// Black Bishops
			bishop = new Bishop('b', {row: 0, column: 2});
			bishop.setIcon();
			board[0][2] = bishop;
			bishop = new Bishop('b', {row: 0, column: 5});
			bishop.setIcon();
			board[0][5] = bishop;
			// White Queen
			queen = new Queen('w', {row: 7, column: 3});
			queen.setIcon();
			board[7][3] = queen;
			// Black Queen
			queen = new Queen('b', {row: 0, column: 3});
			queen.setIcon();
			board[0][3] = queen;
			// White King
			king = new King('w', {row: 7, column: 4});
			king.setIcon();
			board[7][4] = king;
			// Black King
			king = new King('b', {row: 0, column: 4});
			king.setIcon();
			board[0][4] = king;
		},

		getPiece({row, column}) {
			return board[row][column];
		},

		getPossibleMoves({row, column}) {
            let moves;
            let piece;
            piece = board[row][column];
            return validateMoves(piece);
        },

		movePiece({row, column}, toPosition) {
			board[toPosition.row][toPosition.column] = board[row][column];
			board[row][column] = null;
			board[toPosition.row][toPosition.column].setCurrentPosition(toPosition);
		},

		board
	};
})();