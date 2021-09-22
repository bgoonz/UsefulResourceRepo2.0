import React from 'react';
import ReactDOM from 'react-dom';
import  Game  from './containers/Game';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Game
  boardSize={11}
  playerSize={25}
/>, document.getElementById('root'));
registerServiceWorker();
