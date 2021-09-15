const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let secretNumber;
let numAttempts;

const randomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const checkGuess = (num) => {
  if (num > secretNumber) {
    console.log("Too high");
    return false;
  } else if (num < secretNumber) {
    console.log("Too low");
    return false;
  }
  console.log("Correct!");
  return true;
};

const askGuess = () =>
  rl.question("Enter a Guess, you have  " + numAttempts + " left ", (input) => {
    if (isNaN(Number(input))) {
      console.log("That's not a number!");
      return askGuess();
    }
    let answer = checkGuess(Number(input));
    numAttempts--;
    if (!answer && numAttempts > 0) {
      askGuess();
    } else {
      if (!answer && numAttempts === 0) {
        rl.close();
        console.log("No more turns! You lose!");
      } else {
        rl.close();
        console.log("You Win!");
      }
    }
  });

const askRange = () =>
  rl.question("Enter a max number ", (input) => {
    if (isNaN(Number(input))) {
      console.log("That's not a number!");
      askRange();
    }
    let maxNumber = input;
    console.log("*" + maxNumber + "*");
    rl.question("Enter a min number ", (input) => {
      if (isNaN(Number(input))) {
        console.log("That's not a number!");
        askRange();
      }
      let minNumber = input;
      console.log("*" + minNumber + "*");
      secretNumber = randomInRange(Number(minNumber), Number(maxNumber));
      askGuess();
    });
  });

const askTurnLimit = () =>
  rl.question("How many turns do you want? ", (input) => {
    if (isNaN(Number(input))) {
      console.log("That's not a number!");
      askTurnLimit();
    }
    numAttempts = input;
    askRange();
  });

askTurnLimit();
