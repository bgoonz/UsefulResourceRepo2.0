import renderer from './renderer';
import loader from './loader';
import Game from './game';

document.getElementById('game').appendChild(renderer.view);

loader.load((loader, resources) => {
  const game = new Game({resources, renderer});
  game.start();
});
