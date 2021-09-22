import * as math from "./math.js";

const guess = document.getElementById("user-guess");
const minNum = document.getElementById("min-number");
const maxNum = document.getElementById("max-number");

const newGameButton = document.getElementById("new-game");
const rangeSubmitButton = document.getElementById("submit-range");
const guessSubmitButton = document.getElementById("guess-button");

const displayResponse = document.getElementById("display-response");
const displayRange = document.getElementById("display-range");
const displayTurnsLeft = document.getElementById("display-turns-left");

let secretNumber;
let turnsLeft = 5;

const clearBoard = () => {
  minNum.value = "";
  maxNum.value = "";
  guess.value = "";
  displayResponse.innerHTML = "";
  displayRange.innerHTML = "";
  displayTurnsLeft.innerHTML = "";
};

const setUpBoard = () => {
  displayRange.innerHTML = `Min: ${minNum.value} Max:${maxNum.value}`;
  displayTurnsLeft.innerHTML = `Turns Left: ${turnsLeft}`;
  minNum.value = "";
  maxNum.value = "";
  rangeSubmitButton.disabled = true;
  guessSubmitButton.disabled = false;
  newGameButton.disabled = false;
};

const guessChecker = () => {
  let currentGuess = math.checkGuess(Number(guess.value), secretNumber);
  switch (currentGuess) {
    case 2:
      displayResponse.innerHTML = "too high!!!!";
      break;
    case 1:
      displayResponse.innerHTML = "too low....";
      break;
    case 0:
      displayResponse.innerHTML = "juuuuust right";
      break;
  }
};

const handleTurnDisplay = () => {
  turnsLeft--;
  displayTurnsLeft.innerHTML = `Turns Left: ${turnsLeft}`;
  guess.value = "";
};

const handleTurn = () => {
  if (turnsLeft) {
    guessChecker();
    handleTurnDisplay();
  } else {
    guessSubmitButton.disabled = true;
    displayResponse.innerHTML = "You fail! Try harder next time 😝";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("input", () => {
    if (minNum.value !== "" && maxNum.value !== "") {
      rangeSubmitButton.disabled = false;
    }
  });

  rangeSubmitButton.addEventListener("click", () => {
    secretNumber = math.randomInRange(
      Number(minNum.value),
      Number(maxNum.value)
    );
    setUpBoard();
  });

  guessSubmitButton.addEventListener("click", () => {
    handleTurn();
  });

  newGameButton.addEventListener("click", () => {
    clearBoard();
  });
});
