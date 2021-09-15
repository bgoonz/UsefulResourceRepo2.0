const Game = ((Brd, UI, UF) => {

	let selectedPiece = null;
	let possibleMoves = null;
	let selectedSquareData = null;

	const whitePlayer = new Player('w', 'White');
	const blackPlayer = new Player('b', 'Black');

	let activePlayer = whitePlayer;

	const toggleActivePlayer = () => {
		activePlayer = (activePlayer.color === 'w' ? blackPlayer : whitePlayer)
		console.log(`${activePlayer.name}'s turn`);
	};

	const setupEventListeners = () => {
		document.querySelectorAll('.square').forEach(square => {
			square.addEventListener('click', makeMoveOrShowPossibleMoves);
		});
	};

	var makeMoveOrShowPossibleMoves = ({target}) => {
		let squareData;
		square = target;
		squareData = UF.parseSquare(square);
		selectedPiece ? makeMove(squareData) : showPossibleMoves(squareData);
	};

	var showPossibleMoves = squareData => {
		if (isValidSquare(squareData)) {
			selectedPiece = Brd.getPiece(squareData);
			selectedSquareData = squareData;
			possibleMoves = Brd.getPossibleMoves(squareData);
			possibleMoves.forEach(possibleMove => {
				UI.highlightSquare(possibleMove);
			});
		}
	};

	var makeMove = moveData => {
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

	var isValidSquare = squareData => {
		const piece = Brd.getPiece(squareData);
		return piece != null && piece.color === activePlayer.color;
	};

	var isValidMove = moveData => {
		let valid = false;
		possibleMoves.forEach(function(squareData) {
			if (JSON.stringify(squareData) === JSON.stringify(moveData)) {
				valid = true;
				this.break;
			}
		});
		return valid;		
	};

	return {
		init() {
			console.log("Game Started! White's Turn");
			UI.resetSquareColors();
			Brd.initializeBoard();
			setupEventListeners();
		}
	};

})(Board, UserInterface, UtilityFunctions);

Game.init();