import React, { Component } from "react";

import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";

interface AppState {
  gameOver: boolean;
  userChoice: string;
  computerChoice: string;
}

class App extends Component<{}, AppState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      gameOver: false,
      userChoice: "",
      computerChoice: ""
    };

    this.chooseOption = this.chooseOption.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  chooseOption(e: any) {
    this.setState({
      computerChoice: this.randomGuess(),
      userChoice: e.target.dataset.choice,
      gameOver: true
    });
  }

  randomGuess() {
    const guess = Math.floor(Math.random() * 3);
    return ["Rock", "Paper", "Scissors"][guess];
  }

  renderScene() {
    if (this.state.gameOver) {
      return (
        <GameOver
          userChoice={this.state.userChoice}
          computerChoice={this.state.computerChoice}
          playAgain={this.playAgain}
        />
      );
    } else {
      return <Game chooseOption={this.chooseOption} />;
    }
  }

  playAgain() {
    this.setState({
      gameOver: false,
      userChoice: "",
      computerChoice: ""
    });
  }

  render() {
    return (
      <div>
        <a
          className="github-fork-ribbon"
          href="https://github.com/jodylecompte/rock-paper-scissors"
          data-ribbon="Fork me on GitHub"
          title="Fork me on GitHub"
        >
          Fork me on GitHub
        </a>
        <h1>Rock, Paper, Scissors</h1>
        <div className="scene">{this.renderScene()}</div>
        <footer>
          Coded with 💓 by <a href="https://jodylecompte.com">Jody LeCompte</a>.
        </footer>
      </div>
    );
  }
}

export default App;
