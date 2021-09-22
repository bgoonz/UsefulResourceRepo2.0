import React, { Component } from 'react';
import  GameInfo  from '../components/GameInfo';
import  Board  from '../components/Board';
import  Player  from '../components/Player';
import  Enemy from '../components/Enemy';
import  Square  from '../components/Square';
import  { UP, DOWN, LEFT, RIGHT } from '../helpers/constants';

const getDefaultState = ({ boardSize, playerSize, highScore = 0 }) => {
    const half = Math.floor(boardSize / 2) * playerSize;
    return {
      size: {
        board: boardSize,
        player: playerSize,
        maxDim: boardSize * playerSize
      },
      positions: {
        player: {
          top: half,
          left: half
        },
        enemies: []
      },
      playerScore: 0,
      highScore,
      timeElapsed: 0,
      enemySpeed: 5,
      enemyIndex: 0,
      activeEnemies: 1,
      baseScore: 10
    }
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    const half = Math.floor(props.boardSize / 2) * props.playerSize;
    const { boardSize, playerSize } = props;
    this.state = getDefaultState({ boardSize, playerSize })
  }

  placeEnemy = () => {
    // the direction of the enemies are always towards the player
    const { player, maxDim } = this.state.size;
    const { player: playerPos } = this.state.positions;

    // assign to a random side from which the enemy starts
    const startingPointEnemy = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const side = startingPointEnemy([UP, DOWN, LEFT, RIGHT]);

    // generate enemy object
    const newEnemy = this.generateNewEnemy(playerPos, side);

    // add new enemy to state
    this.setState({
      positions: {
        ...this.state.positions,
        enemies: [...this.state.positions.enemies].concat(newEnemy)
      }
    });
  }

  generateNewEnemy = (position, side) => {
    this.setState({
      enemyIndex: this.state.enemyIndex + 1
    });

    const newEnemy = { key: this.state.enemyIndex, dir: side };
    const { maxDim, player } = this.state.size;

    switch(side) {
      case UP:
        newEnemy.top = maxDim;
        newEnemy.left = position.left;
        break;
      case DOWN:
        newEnemy.top = 0 - player;
        newEnemy.left = position.left;
        break;
      case LEFT:
        newEnemy.top = position.top;
        newEnemy.left = maxDim;
        break;
      case RIGHT:
        newEnemy.top = position.top;
        newEnemy.left = 0 - player;
        break;
    }
    return newEnemy;
  }

  handlePlayerMovement = (dirObj) => {
    const { top, left } = this.state.positions.player;
    const { player, maxDim } = this.state.size;

    // check walls
    switch (dirObj.dir) {
      case UP:
        if (top === 0) return;
        break;
      case DOWN:
        if (top === maxDim - player) return;
        break;
      case LEFT:
        if (left === 0) return;
        break;
      case RIGHT:
        if (left === maxDim - player) return;
        break;
      }

    this.setState({
      positions: {
        ...this.state.positions,
        player: {
          top: top + (player * dirObj.top),
          left: left + (player * dirObj.left)
        }
      }
    });
  }

  handlePlayerCollision = () => {
    this.resetGame();
  }

  startGame = () => {
    this.enemyInterval = setInterval(this.updateEnemyPositions, 50);
    this.timeInterval = setInterval(this.updateGame, 1000);
    this.gameInterval = setInterval(this.updateEnemiesInPlay, 250);
  }

  updateGame = () => {
    const { timeElapsed } = this.state;
    this.updateTimeAndScore();
    if (timeElapsed > 0) {
      if (timeElapsed % 2 === 0) {
        this.incrementEnemySpeed();
      }
      if (timeElapsed % 5 === 0) {
        this.incrementActiveEnemies();
      }
    }
  }

  updateEnemyPositions = () => {
    const { enemySpeed, positions: { enemies }, size: { player, maxDim }} = this.state;

    this.setState({
      positions: {
        ...this.state.positions,
        enemies: enemies.filter(enemy => !enemy.remove).map(enemy => {
          if (enemy.top < (0 - player) ||
            enemy.top > maxDim + player ||
            enemy.left < (0 - player) ||
            enemy.left > maxDim + player ) {
            enemy.remove = true;
            return enemy;
          }

          // based on direction, increment the correct value (top / left)
          switch(enemy.dir) {
            case UP:
              enemy.top -= enemySpeed;
              break;
            case DOWN:
              enemy.top += enemySpeed;
              break;
            case LEFT:
              enemy.left -= enemySpeed;
              break;
            case RIGHT:
              enemy.left += enemySpeed;
              break;
          }
          return enemy;
        })
      }
    });
  }

  updateEnemiesInPlay = () => {
    const { activeEnemies } = this.state;
    const { enemies } = this.state.positions;

    if (enemies.length < activeEnemies) {
      this.placeEnemy();
    }
  }

  updateTimeAndScore = () => {
    const { timeElapsed, playerScore, baseScore } = this.state;

    this.setState({
      timeElapsed: timeElapsed + 1,
      playerScore: playerScore + baseScore,
    });
  }

  incrementEnemySpeed = () => {
    const { enemySpeed } = this.state;

    this.setState({
      enemySpeed: parseFloat((enemySpeed + 0.25).toFixed(2))
    });
  }

  incrementActiveEnemies = () => {
    this.setState({
      activeEnemies: this.state.activeEnemies + 1
    });
  }

  resetGame = () => {
    const { boardSize, playerSize } = this.props;
    const { playerScore, highScore } = this.state;
    // clear intervals
    clearInterval(this.gameInterval);
    clearInterval(this.enemyInterval);
    clearInterval(this.timeInterval);
    // restart game
    this.startGame();
  }

  style = () => {
    return {
      width: '85%',
      maxWidth: '600px',
      margin: '0 auto'
    };
  }

  render() {
    const {
      size: { board, player },
      positions: { player: playerPos },
      playerScore,
      timeElapsed,
      highScore,
    } = this.state;

    return (
      <div style={this.style()}>
        <GameInfo
          playerScore={playerScore}
          timeElapsed={timeElapsed}
          highScore={highScore}
        />

        <Board dimension={board * player}>
          <Player
            size={player}
            position={playerPos}
            handlePlayerMovement={this.handlePlayerMovement} />

          {
            this.state.positions.enemies.map(enemy =>
              <Enemy
                key={enemy.key}
                size={player}
                info={enemy}
                playerPosition={playerPos}
                onCollide={this.handlePlayerCollision} />
            )
          }
        </Board>
      </div>
    )
  }

  componentDidMount() {
    this.startGame();
  }

  componentWillUnmount() {
    clearInterval(this.state.gameInterval);
    clearInterval(this.state.enemyInterval);
    clearInterval(this.state.timeInterval);
  }
}
