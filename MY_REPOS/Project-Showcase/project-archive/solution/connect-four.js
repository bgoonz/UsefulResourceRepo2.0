import { Game } from './game.js';

let game = undefined;

function updateUI() {
  if (game === undefined) {
    document.getElementById('board-holder').classList.add('is-invisible');
  } else {
    document.getElementById('game-name').innerHTML = game.getName();
    document.getElementById('board-holder').classList.remove('is-invisible');

    for (let columnIndex = 0; columnIndex < 7; columnIndex += 1) {
      const clickTarget = document.getElementById(`column-${columnIndex}`);
      if (game.isColumnFull(columnIndex)) {
        clickTarget.classList.add('full');
      } else {
        clickTarget.classList.remove('full');
      }
    }

    for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex += 1) {
        const squareId = `square-${rowIndex}-${columnIndex}`;
        const square = document.getElementById(squareId);
        square.innerHTML = '';

        const playerNumber = game.getTokenAt(rowIndex, columnIndex);
        if (playerNumber === 1) {
          const token = document.createElement('div');
          token.classList.add('token', 'black');
          square.appendChild(token);
        } else if (playerNumber === 2) {
          const token = document.createElement('div');
          token.classList.add('token', 'red');
          square.appendChild(token);
        }
      }
    }

    const clickTargets = document.getElementById('click-targets');
    if (game.currentPlayer === 1) {
      clickTargets.classList.add('black');
      clickTargets.classList.remove('red');
    } else {
      clickTargets.classList.add('red');
      clickTargets.classList.remove('black');
    }
  }
}

function updateButtonBasedOnPlayerNames() {
  const player1Name = document.getElementById('player-1-name').value;
  const player2Name = document.getElementById('player-2-name').value;
  const isValidForm = player1Name.length > 0 && player2Name.length > 0;

  document.getElementById('new-game').disabled = !isValidForm;
}

window.addEventListener('DOMContentLoaded', () => {

  document.getElementById('click-targets').addEventListener('click', event => {
    const targetId = event.target.id;
    if (!targetId.startsWith('column-')) return;

    const columnIndex = Number.parseInt(targetId[targetId.length - 1]);
    game.playInColumn(columnIndex);
    updateUI();
  });
  document.getElementById('player-1-name').addEventListener('keyup', () => {
    updateButtonBasedOnPlayerNames();
  });
  document.getElementById('player-2-name').addEventListener('keyup', () => {
    updateButtonBasedOnPlayerNames();
  });
  document.getElementById('new-game').addEventListener('click', () => {
    const player1Name = document.getElementById('player-1-name').value;
    const player2Name = document.getElementById('player-2-name').value;
    game = new Game(player1Name, player2Name);
    document.getElementById('player-1-name').value = '';
    document.getElementById('player-2-name').value = '';
    updateButtonBasedOnPlayerNames();
    updateUI();
  });

});
