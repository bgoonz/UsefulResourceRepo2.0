import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PLAYER_ONE: "X",
      PLAYER_TWO: "O",
      squares: Array(9).fill(null),
    };
    this.state.turn = this.state.PLAYER_ONE;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] === null && !this.isGameFinished(this.state.squares)) {
      if (this.state.turn === this.state.PLAYER_ONE) {
        squares[i] = this.state.PLAYER_ONE;
        this.setState({ turn: this.state.PLAYER_TWO });
      } else {
        squares[i] = this.state.PLAYER_TWO;
        this.setState({ turn: this.state.PLAYER_ONE });
      }
      this.setState((state) => ({
        squares: squares,
      }));
    }
  }

  isGameFinished(squareState) {
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if (
        squareState[a] &&
        squareState[a] === squareState[b] &&
        squareState[a] === squareState[c]
      ) {
        return true;
      }
    }
    return false;
  }

  renderSquare(i) {
    return (
      <Square
        id={i}
        value={this.state.squares[i]}
        handleClick={this.handleClick}
      />
    );
  }

  render() {
    const winner = this.isGameFinished(this.state.squares);
    let status = "";
    if (winner) {
      status =
        this.state.turn === this.state.PLAYER_ONE
          ? "Player 2 won"
          : "Player 1 won";
    } else {
      status =
        this.state.turn === this.state.PLAYER_ONE
          ? "Player 1's turn"
          : "Player 2's turn";
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
