import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Square} from '../square/Square';
import styles from './board.scss';

class Board extends Component {

    renderSquare(i) {
        return (
            <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            />
        )
    }
    render() {
        return (
            <div className={styles.board}>
                <div className={styles.boardrow}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={styles.boardrow}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={styles.boardrow}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

Board.propTypes = {
    squares: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Board;