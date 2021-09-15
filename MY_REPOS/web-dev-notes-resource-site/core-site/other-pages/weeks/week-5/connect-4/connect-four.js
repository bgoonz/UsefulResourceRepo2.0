/* TO-DO!!
    New Game - hide board, set starting turn, reset board.
-   Something to keep track of the turn/ who's turn it is
    check full column
    check winner
    check tie
*/
import { Game, CurrentPlayer } from './game.js';
import { GameJsonSerializer, GameJsonDeSerializer } from './save-state.js';

let game = undefined;
if (localStorage.getItem("data") !== null) {
    let loadedData = new GameJsonDeSerializer(localStorage.getItem("data")).deSerialize();
    game = loadedData;
    game = new Game(game.player1, game.player2)
    console.log(game)


}

let updateUI = () => {
    if (!game) {
        document
            .getElementById("board-holder")
            .classList.add("is-invisible");
    }
    else {
        document
            .getElementById("board-holder")
            .classList.remove("is-invisible");


        for (let i = 0; i <= 6; i++) {
            for (let j = 0; j <= 5; j++) {
                const square = document.getElementById(`square-${j}-${i}`);

                square.innerHTML = '';

                const playerNumber = game.getTokenAt(i, j);
                if (playerNumber === 1) {
                    const token = document.createElement('div');
                    token.classList.add("token");
                    token.classList.add("black");
                    square.appendChild(token);
                }
                else if (playerNumber === 2) {
                    const token = document.createElement('div');
                    token.classList.add("token");
                    token.classList.add("red");
                    square.appendChild(token);
                }
            }
        }

        const currentPlayer = player.currentPlayer;
        const clickTargets = document.getElementById("click-targets");
        if (currentPlayer === 1) {
            clickTargets.classList.add("black");
            clickTargets.classList.remove("red");
        }
        else {
            clickTargets.classList.add("red");
            clickTargets.classList.remove("black");
        }

        for (let i = 0; i <= 6; i++) {
            if (game.isColumnFull(i)) {
                document
                    .getElementById(`column-${i}`)
                    .classList.add("full")
                document
                    .getElementById(`column-${i}`)
                    .setAttribute("disabled", "true")
            }
        }

        if (game.checkForTie()) {
            game.winnerNumber = 3;
        }
        game.checkForColumnWin();
        game.checkForRowWin();
        game.checkForDiagonalWin();

        document
            .getElementById("game-name")
            .innerHTML = game.getName();

        let saveData = new GameJsonSerializer(game).serialize();
        localStorage.setItem("data", saveData);
    }
}

let saveUI = () => {

}

const player1 = document.getElementById("player-1-name");
const player2 = document.getElementById("player-2-name");
document.addEventListener("keyup", eve => {
    if (player1.value && player2.value) {
        document
            .getElementById("new-game")
            .removeAttribute("disabled");
    }

});

//Click New Game
document
    .getElementById("new-game")
    .addEventListener("click", eve => {
        // if (game === undefined) {
        game = new Game(player1.value, player2.value);
        document
            .getElementById("board-holder")
            .classList.remove("is-invisible");
        document
            .getElementById("new-game")
            .setAttribute("disabled", "true");
        document
            .getElementById("game-name")
            .innerHTML = game.getName();

        player1.value = "";
        player2.value = "";
        updateUI();
        // }
    });

let something = document.getElementById("click-targets");

//Click token
const player = new CurrentPlayer(player1.value, player2.value);
something.addEventListener("click", eve => {
    let columnNumber = Number(eve.target.id[7]);
    if (!game.isColumnFull(columnNumber)) {
        game.column[columnNumber].add(player.getTurn());
        player.playInColumn();

        updateUI();
    }
});
