import * as React from 'react';
import SmileyDead from './icons/smiley-dead';
import SmileyLaugh from './icons/smiley-laugh';
import SmileySunGlasses from './icons/smiley-sunglasses';

const numberColors = {
  0: '',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
};

enum GameStatus {
  RUNNING,
  PAUSED,
  GAME_OVER,
  VICTORY,
}

interface IPosition {
  x: number;
  y: number;
}

interface IMineSweeperStateProps {
  gameStatus: GameStatus;
  score: number;
  rows: number;
  columns: number;
  mines: number;
  mineField: IMineField[][];
}

interface IMineField {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  mineCounter: number | null; // If its a mine the counter will be null
  position: IPosition;
}

interface IMineSweeperProps {
  rows: number;
  columns: number;
  mines: number;
}

export default class MineSweeper extends React.Component<IMineSweeperProps, IMineSweeperStateProps> {
  private timerId: number;

  constructor(props: IMineSweeperProps) {
    super(props);
    this.state = {
      score: 0,
      gameStatus: GameStatus.PAUSED,
      rows: this.props.rows,
      columns: this.props.columns,
      mines: this.props.mines,
      mineField: this.generateMineField(this.props.rows, this.props.columns, this.props.mines),
    };
  }

  public componentDidMount() {
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', (e) => this.onKeyDown(e));
  }

  public componentDidUpdate(prevProps: IMineSweeperProps) {
    const { rows, columns, mines } = this.props;
    if (rows !== prevProps.rows || columns !== prevProps.columns || mines !== prevProps.mines) {
      this.clearTimer();
      this.setState({
        ...this.state,
        rows,
        columns,
        mines,
        score: 0,
        gameStatus: GameStatus.PAUSED,
        mineField: this.generateMineField(rows, columns, mines),
      });
    }
  }

  public gameOver() {
    this.clearTimer();
    // TODO: Use this.state.score as Highscore
    this.setState({ gameStatus: GameStatus.GAME_OVER });
    this.revealAllMines();
  }

  public render() {
    const grid = this.state.mineField.map((row: IMineField[], i) => {
      const cells = row.map((_, j) => {
        const mine = this.state.mineField[i][j];
        const isRevealed = mine.isRevealed;
        const isFlagged = mine.isFlagged;
        const isRevealedMine = mine.isRevealed && mine.isMine;
        const flagged = isFlagged ? ' flagged' : '';
        const revealed = isRevealed ? ' revealed' : '';
        const revealedMine = isRevealedMine ? ' mine' : '';
        const num = isRevealed && mine.mineCounter ? numberColors[mine.mineCounter] : '';
        const mineCounter = mine.mineCounter && mine.isRevealed && mine.mineCounter > 0 ? mine.mineCounter : '';
        return (
          <div
            key={`cell-${i}-${j}`}
            className={`grid-cell${revealed}${revealedMine}${flagged} ${num}`}
            onClick={() => this.onCellClick(i, j)}
            onContextMenu={(e) => this.onCellRightClick(e, i, j)}
            onDoubleClick={(e) => this.onCellDoubleClick(e, i, j)}
          >
            {mineCounter}
          </div>
        );
      });
      return (
        <div key={`row-${i}`} className="grid-row">
          {cells}
        </div>
      );
    });

    const flagCounter = this.state.mineField
      .reduce((acc: IMineField[], val: IMineField[]) => acc.concat(val), [])
      .filter((m: IMineField) => m.isFlagged && !m.isRevealed).length;
    const counter = this.props.mines - flagCounter;
    const counterText = this.toDisplayNumber(counter);
    const timerText = this.toDisplayNumber(this.state.score);

    return (
      <div className="game-wrapper">
        <div className="mine-sweeper">
          <div className="game-state">
            <div className="counter">
              <span>{counterText}</span>
            </div>
            <div className="game-status" onClick={() => this.resetGame()} title="Reset the game">
              {this.state.gameStatus === GameStatus.PAUSED && <SmileyLaugh />}
              {this.state.gameStatus === GameStatus.RUNNING && <SmileyLaugh />}
              {this.state.gameStatus === GameStatus.GAME_OVER && <SmileyDead />}
              {this.state.gameStatus === GameStatus.VICTORY && <SmileySunGlasses />}
            </div>
            <div className="timer">
              <span>{timerText}</span>
            </div>
          </div>
          <div className="grid">{grid}</div>
        </div>
      </div>
    );
  }

  private toDisplayNumber(num: number) {
    if (num > 999) {
      return '999';
    }
    let displayNumber = '';
    if (num < 100) {
      displayNumber += '0';
    }
    if (num < 10) {
      displayNumber += '0';
    }
    return displayNumber.concat(String(num));
  }

  private onKeyDown(e: KeyboardEvent) {
    if (this.state.gameStatus !== GameStatus.PAUSED && e.keyCode === 82) {
      this.resetGame();
    }
  }

  private clearTimer() {
    window.clearInterval(this.timerId);
  }

  private resetGame() {
    this.clearTimer();
    this.setState({
      score: 0,
      gameStatus: GameStatus.PAUSED,
      mineField: this.generateMineField(this.props.rows, this.props.columns, this.props.mines),
    });
  }

  private placeMinesOnField(mineField: IMineField[][], rows: number, columns: number, numberOfMines: number) {
    while (numberOfMines > 0) {
      const rowIdx = this.getRandomNumber(rows);
      const colIdx = this.getRandomNumber(columns);
      if (!mineField[rowIdx][colIdx].isMine) {
        mineField[rowIdx][colIdx].isMine = true;
        numberOfMines--;
      }
    }
    return mineField;
  }

  private getRandomNumber = (num: number): number => Math.floor(Math.random() * num);

  private toMineField = (x: number, y: number): IMineField => ({
    isMine: false,
    isFlagged: false,
    isRevealed: false,
    mineCounter: null, // If its a mine the counter will remain null
    position: { x, y },
  });

  private createEmptyMineField(rows: number, columns: number): IMineField[][] {
    return Array(rows)
      .fill(0)
      .map((_, x) =>
        Array(columns)
          .fill(0)
          .map((m, y) => this.toMineField(x, y))
      );
  }

  private generateMineField(rows: number, columns: number, mines: number) {
    return this.setMineCounters(this.placeMinesOnField(this.createEmptyMineField(rows, columns), rows, columns, mines));
  }

  private updateTimer() {
    const score = this.state.score + 1;
    this.setState({
      score,
    });
  }

  private onCellClick(x: number, y: number) {
    if (
      this.state.gameStatus === GameStatus.VICTORY ||
      this.state.gameStatus === GameStatus.GAME_OVER ||
      this.isFlagged(x, y)
    ) {
      return;
    }
    if (this.state.gameStatus !== GameStatus.RUNNING) {
      this.setState({
        gameStatus: GameStatus.RUNNING,
      });
      this.timerId = window.setInterval(this.updateTimer.bind(this), 1000);
    }
    this.isMine(x, y) ? this.gameOver() : this.revealCell(x, y);
  }

  private onCellRightClick(e: React.MouseEvent, x: number, y: number) {
    e.preventDefault();
    if (this.state.gameStatus === GameStatus.VICTORY || this.state.gameStatus === GameStatus.GAME_OVER) {
      return;
    }
    this.toggleFlagged(x, y);
  }

  private onCellDoubleClick(e: React.MouseEvent, x: number, y: number) {
    e.preventDefault();
    if (this.state.gameStatus === GameStatus.VICTORY || this.state.gameStatus === GameStatus.GAME_OVER) {
      return;
    }
    const mine = this.state.mineField[x][y];
    if (mine.isRevealed) {
      this.perimeterReveal(x, y);
    }
  }

  private isMine = (x: number, y: number): boolean => this.state.mineField[x][y].isMine;

  private isFlagged = (x: number, y: number): boolean => this.state.mineField[x][y].isFlagged;

  private revealAllMines() {
    const mineField = this.state.mineField;
    mineField.map((row) =>
      row.forEach((field) => {
        if (field.isMine) {
          field.isRevealed = true;
          field.isFlagged = false;
        }
      })
    );
    this.setState({
      mineField,
    });
  }

  private toggleFlagged(x: number, y: number) {
    const mineField = this.state.mineField;
    if (!mineField[x][y].isRevealed) {
      mineField[x][y].isFlagged = !mineField[x][y].isFlagged;
      this.setState({
        mineField,
      });
    }
  }

  private revealCell = (x: number, y: number) => {
    const field = this.state.mineField[x][y];
    field.isRevealed = true;
    field.isFlagged = false;
    const winningCondition =
      this.state.mineField
        .reduce((acc: IMineField[], val: IMineField[]) => acc.concat(val), [])
        .filter((m: IMineField) => !m.isMine && !m.isRevealed).length === 0;

    if (winningCondition) {
      this.clearTimer();
      this.setState({
        gameStatus: GameStatus.VICTORY,
      });
    } else {
      this.setState(
        {
          mineField: this.state.mineField,
        },
        () => this.revealSurroundingCells(x, y)
      );
    }
  };

  private perimeterReveal(x: number, y: number) {
    const cellPositions = this.getPositionsOfSurroundingCells(x, y);
    const fieldMineCounter = this.state.mineField[x][y].mineCounter;
    const numberOfFlags = cellPositions
      .map(([posX, posY]) => this.state.mineField[posX][posY])
      .filter((mine) => !mine.isRevealed && mine.isFlagged).length;
    if (numberOfFlags !== fieldMineCounter) {
      return;
    }
    const surroundingMines = cellPositions
      .map(([posX, posY]) => this.state.mineField[posX][posY])
      .filter((mine) => !mine.isRevealed && !mine.isFlagged);

    surroundingMines.forEach((mine: IMineField) => {
      mine.isMine ? this.gameOver() : this.revealCell(mine.position.x, mine.position.y);
    });
  }

  private revealSurroundingCells(x: number, y: number) {
    if (this.state.mineField[x][y].mineCounter !== 0) {
      return;
    }
    const cellPositions = this.getPositionsOfSurroundingCells(x, y);
    const surroundingMines = cellPositions
      .map(([posX, posY]) => this.state.mineField[posX][posY])
      .filter((mine: IMineField) => !mine.isRevealed);
    surroundingMines.forEach((mine: IMineField) => {
      this.revealCell(mine.position.x, mine.position.y);
    });
  }

  private getSurroundingCells(x: number, y: number): Array<[number, number]> {
    return [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];
  }

  private setMineCounters(mineField: IMineField[][]): IMineField[][] {
    return mineField.map((row, x) =>
      row.map((field, y) => {
        return field.isMine
          ? field
          : {
              ...field,
              mineCounter: this.countSurroundingMines(x, y, mineField),
            };
      })
    );
  }

  private countSurroundingMines(x: number, y: number, mineField: IMineField[][]): number {
    let counter = 0;
    const surroundingCells = this.constructSurroundingCells(x, y);
    surroundingCells.forEach((pos: number[]) => {
      if (mineField[pos[0]][pos[1]].isMine) {
        counter++;
      }
    });
    return counter;
  }

  private constructSurroundingCells(x: number, y: number) {
    return this.getSurroundingCells(x, y).reduce(
      (acc: Array<[number, number]>, val) =>
        val[0] < 0
          ? acc
          : val[1] < 0
          ? acc
          : val[0] >= this.props.rows
          ? acc
          : val[1] >= this.props.columns
          ? acc
          : [...acc, val],
      []
    );
  }

  private getPositionsOfSurroundingCells(x: number, y: number) {
    return this.constructSurroundingCells(x, y);
  }
}
