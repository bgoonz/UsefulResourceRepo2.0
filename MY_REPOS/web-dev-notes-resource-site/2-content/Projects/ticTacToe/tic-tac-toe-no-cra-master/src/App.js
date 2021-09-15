import React, { Component } from 'react';
import Board from './components/board/Board';
import {CalculateWinner} from './components/utils/CalculateWinner';
import styles from './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber : 0,
            xIsNext: true
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (i) => {
        const history = this.state.history.slice(0, 
            this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = CalculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
            `Go to move # ${move}`:
            `Go to game start`;
            return (
                <li key={move}>
                    <button className={styles.btn} onClick={() => this.jumpTo(move)}>
                    {desc}
                    </button>
                </li>
            )
        })

        let status;
        if(history.length - 1 === 9 && !winner) {
            status = `Game draw`;
        } else if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        
        return (
            <div className={styles.Site}>
                <div className={styles.Sitecontent}>
                    <h1 className={styles.gametitle}>Tic Tac Toe</h1>
                    <div className={styles.game}>
                        <div>
                            <Board
                                squares={current.squares}
                                onClick={i => this.handleClick(i)} />
                        </div>
                    </div>
                    <div className={styles.gameinfo}>
                        <div className={styles.status}>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
                <div className={styles.footercontainer}>
                    <footer className={styles.sitefooter}>
                        <p className={styles.identity}>© 2018 Maria D. Campbell</p>
                    </footer>
                </div>
            </div>
        )
    }
}

export default App;