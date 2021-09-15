export function strToNode(str) {
  const temp = document.implementation.createHTMLDocument("");
  temp.body.innerHTML = str;
  return temp.body.firstChild;
}

export function updateGameStatus(game, chain) {
  let status = "";

  let moveColor = "White";
  if (game.turn() === "b") {
    moveColor = "Black";
  }

  if (game.in_checkmate() === true) {
    // checkmate?
    status = "Game over, " + moveColor + " is in checkmate.";
  } else if (game.in_draw() === true) {
    // draw?
    status = "Game over, drawn position";
  } else {
    // game still on
    status = moveColor + " to move";

    if (game.in_check() === true) {
      // check?
      status += ", " + moveColor + " is in check";
    }
  }

  let helperNextStep = " (Please create a New Block)";
  if (chain.isMostRecentBlockDataEmpty()) {
    helperNextStep = " (Please make your move)";
  } else if (
    !chain.isMostRecentBlockDataEmpty() &&
    !chain.isMostRecentBlockValid()
  ) {
    helperNextStep = " (Please mine your block)";
  }

  document.querySelector("#game-status").textContent = status + helperNextStep;
}
