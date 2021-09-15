import Stage from './sprites/stage';
import Hero from './sprites/hero';
import Tortle from './sprites/tortle';
import TileMatcher from './utils/tile-matcher';
import GroundMatcher from './utils/ground-matcher';

export default class Game {

  /**
   * Create a new game.
   *
   * @param {object} resources
   */

  constructor({resources: {world}, renderer}) {
    this.loop = this.loop.bind(this);

    this.renderer = renderer;
    const tileMatcher = new TileMatcher(world);
    const groundMatcher = this.groundMatcher = new GroundMatcher(tileMatcher);

    this.stage = new Stage();
    this.hero = new Hero({groundMatcher});
    this.tortle = new Tortle({groundMatcher});
    this.tortle.x = 200;
    this.stage.addChild(world.tiledMap);
    this.stage.addChild(this.hero);
    this.stage.addChild(this.tortle);
  }

  /**
   * Start game.
   */

  start() {
    requestAnimationFrame(this.loop);
  }

  /**
   * Loop of the game.
   */

  loop() {
    const dt = this.lastLoopTime
      ? (Date.now() - this.lastLoopTime) / 1000 : 0;
    this.update(dt);
    this.lastLoopTime = Date.now();
    requestAnimationFrame(this.loop);
  }

  /**
   * Called at each requestAnimationFrame.
   *
   * @param {number} dt
   */

  update(dt) {
    this.hero.update(dt);
    this.tortle.update(dt);
    this.renderer.render(this.stage);
  }
}
