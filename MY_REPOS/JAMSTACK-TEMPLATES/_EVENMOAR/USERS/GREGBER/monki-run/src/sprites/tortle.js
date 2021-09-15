import PIXI from 'pixi.js';
import ForceSet from '../utils/force-set';
import Force from '../utils/force';
import XMover from '../utils/x-mover';
import gravity from '../forces/gravity';

export default class Tortle extends PIXI.Sprite {
  constructor({groundMatcher}) {
    const texture = PIXI.Texture.fromImage('src/textures/monki@2x.png');
    super(texture);

    this.groundMatcher = groundMatcher;

    this.forces = new ForceSet({
      gravity: gravity(),
      velocity: new Force(1000, 0, {limit: new PIXI.Point(4)})
    });

    this.xMover = new XMover(this);
    this.direction = XMover.LEFT_DIRECTION;
  }

  update(dt) {
    this.forces.update(dt, this);

    this.groundMatcher.update(this);

    if (!this.groundMatcher.fullGround)
      this.direction = -this.direction;

    if (this.groundMatcher.ground)
      this.xMover.update(this.direction);
    else
      this.xMover.update(null);
  }
}
