var Game = function(Brd, UI, UF) {

	var selectedPiece = null;
	var possibleMoves = null;
	var selectedSquareData = null;

	var whitePlayer = new Player('w', 'White');
	var blackPlayer = new Player('b', 'Black');

	var activePlayer = whitePlayer;

	var toggleActivePlayer = function() {
		activePlayer = (activePlayer.color === 'w' ? blackPlayer : whitePlayer)
		console.log(activePlayer.name + "'s turn");
	};

	var setupEventListeners = function() {
		document.querySelectorAll('.square').forEach(function(square) {
			square.addEventListener('click', makeMoveOrShowPossibleMoves);
		});
	};

	var makeMoveOrShowPossibleMoves = function(event) {
		var squareData;
		square = event.target;
		squareData = UF.parseSquare(square);
		selectedPiece ? makeMove(squareData) : showPossibleMoves(squareData);
	};

	var showPossibleMoves = function(squareData) {
		if (isValidSquare(squareData)) {
			selectedPiece = Brd.getPiece(squareData);
			selectedSquareData = squareData;
			possibleMoves = Brd.getPossibleMoves(squareData);
			possibleMoves.forEach(function(possibleMove){
				UI.highlightSquare(possibleMove);
			});
		}
	};

	var makeMove = function(moveData) {
		UI.resetSquareColors();
		if (isValidMove(moveData)) {
			Brd.movePiece(selectedSquareData, moveData);
			UI.setSquareText(moveData, selectedPiece.icon);
			UI.setSquareText(selectedSquareData, "&nbsp");
			toggleActivePlayer();
		}
		selectedPiece = null;
		selectedSquareData = null;
		possibleMoves = null;
	};

	var isValidSquare = function(squareData) {
		var piece = Brd.getPiece(squareData);
		return piece != null && piece.color === activePlayer.color;
	};

	var isValidMove = function(moveData) {
		var valid = false;
		possibleMoves.forEach(function(squareData) {
			if (JSON.stringify(squareData) === JSON.stringify(moveData)) {
				valid = true;
				this.break;
			}
		});
		return valid;		
	};

	return {
		init: function() {
			console.log("Game Started! White's Turn");
			UI.resetSquareColors();
			Brd.initializeBoard();
			setupEventListeners();
		}
	};

}(Board, UserInterface, UtilityFunctions);

Game.init();