/* global ChessBoard */

export default function ChessBoardFactory(game, chain, updateGameStatus) {
  function onChangePos(oldPos, newPos) {
    chain.updateMostRecentBlock({ fen: game.fen(), pgn: game.pgn() });
    updateGameStatus(game, chain);
  }

  function onDragStart(source, piece, position, orientation) {
    if (
      game.game_over() === true ||
      (game.turn() === "w" && piece.search(/^b/) !== -1) ||
      (game.turn() === "b" && piece.search(/^w/) !== -1) ||
      !chain.isMostRecentBlockDataEmpty()
    ) {
      return false;
    }
  }

  function onDrop(source, piece, position) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: piece,
      promotion: "q",
    });

    // illegal move
    if (move === null) return "snapback";
  }

  updateGameStatus(game, chain);

  return new ChessBoard("board", {
    draggable: true,
    position: "start",
    onChange: onChangePos,
    onDragStart: onDragStart,
    onDrop: onDrop,
  });
}
