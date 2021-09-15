import * as React from 'react';

import MineSweeper from './mine-sweeper';

interface IMineSweeperContainerStateProps {
  rows: number;
  columns: number;
  mines: number;
  difficulty: Difficulty;
}

enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}

export default class MineSweeperContainer extends React.Component<{}, IMineSweeperContainerStateProps> {
  constructor(props = {}) {
    super(props);
    const { rows, columns, mines } = this.getDifficultySettings(Difficulty.EASY);
    this.state = {
      difficulty: Difficulty.EASY,
      rows,
      columns,
      mines,
    };
  }

  public render() {
    return (
      <React.Fragment>
        <div className="header">
          <h1>Minesweeper</h1>
          <div className="instructions">
            <span>
              To flag cells use <span className="hotkey">right click</span>.
            </span>
            <span>
              To perimeter check already revealed cells use <span className="hotkey">double click</span>.
            </span>
            <span>
              To reset the game press the <span className="hotkey">R</span> key or the{' '}
              <span className="hotkey">smiley</span> button.
            </span>
          </div>
        </div>
        <div className="difficulty">
          <h3>Difficulty</h3>
          <div className="difficulty-container">
            <span
              className={this.state.difficulty === Difficulty.EASY ? 'active' : ''}
              onClick={() => this.setDifficulty(Difficulty.EASY)}
            >
              Easy
              <div className="difficulty-mine-container">
                <i className="difficulty-mine" />
              </div>
            </span>
            <span
              className={this.state.difficulty === Difficulty.MEDIUM ? 'active' : ''}
              onClick={() => this.setDifficulty(Difficulty.MEDIUM)}
            >
              Medium
              <div className="difficulty-mine-container">
                <i className="difficulty-mine" />
                <i className="difficulty-mine" />
              </div>
            </span>
            <span
              className={this.state.difficulty === Difficulty.HARD ? 'active' : ''}
              onClick={() => this.setDifficulty(Difficulty.HARD)}
            >
              Hard
              <div className="difficulty-mine-container">
                <i className="difficulty-mine" />
                <i className="difficulty-mine" />
                <i className="difficulty-mine" />
              </div>
            </span>
          </div>
        </div>
        <MineSweeper rows={this.state.rows} columns={this.state.columns} mines={this.state.mines} />
      </React.Fragment>
    );
  }

  private getDifficultySettings(difficulty: Difficulty): { rows: number; columns: number; mines: number } {
    return {
      0: { rows: 8, columns: 8, mines: 10 },
      1: { rows: 16, columns: 16, mines: 40 },
      2: { rows: 16, columns: 30, mines: 99 },
    }[difficulty];
  }

  private setDifficulty(difficulty: Difficulty) {
    const { rows, columns, mines } = this.getDifficultySettings(difficulty);

    this.setState({
      difficulty,
      rows,
      columns,
      mines,
    });
  }
}
