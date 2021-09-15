import React from "react";

interface GameOverProps {
  userChoice: string;
  computerChoice: string;
  playAgain(): void;
}

function determineWinner(userChoice: String, computerChoice: String): string[] {
  switch (true) {
    case userChoice === computerChoice:
      return ["It's a tie"];
    case userChoice === "Rock" && computerChoice === "Scissors":
      return ["You Win!", "Rock Crushes Scissors"];
    case userChoice === "Scissors" && computerChoice === "Paper":
      return ["You Win!", "Scissors Cut Paper"];
    case userChoice === "Paper" && computerChoice === "Rock":
      return ["You Win!", "Paper Covers Rock"];
    case userChoice === "Rock" && computerChoice === "Paper":
      return ["You Lose!", "Paper Covers Rock"];
    case userChoice === "Scissors" && computerChoice === "Rock":
      return ["You Lose!", "Rock Crushes Scissors"];
    case userChoice === "Paper" && computerChoice === "Scissors":
      return ["You Lose!", "Scissors Cut Paper"];
  }
  
  return ["Error", "Malfunction Occured"]
}

export function GameOver(props: GameOverProps) {
  const [status, msg] = determineWinner(props.userChoice, props.computerChoice);

  return (
    <div className="game-over-container">
      <h1>{status}</h1>
      <h2>{msg}</h2>
      <button onClick={props.playAgain}>Play Again?</button>
    </div>
  );
}
