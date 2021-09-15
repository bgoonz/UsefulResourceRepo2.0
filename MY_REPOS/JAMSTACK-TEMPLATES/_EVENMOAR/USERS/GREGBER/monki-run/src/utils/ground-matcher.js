import {Point} from 'pixi.js';

export default class GroundMatcher {
  /**
   * Create a new platform matcher.
   */

  constructor(tileMatcher) {
    this.tileMatcher = tileMatcher;
    this.ground = null;
  }

  /**
   * Return the ground of sprite.
   *
   * @param {PIXI.DisplayObject} sprite
   */

  update(sprite) {
    const bottomRight = new Point(sprite.position.x + sprite.width, sprite.position.y + sprite.height);
    const bottomLeft = new Point(sprite.position.x, sprite.position.y + sprite.height);
    this.leftGround = this.getPlatformAtPosition(bottomLeft);
    this.rightGround = this.getPlatformAtPosition(bottomRight);
    this.fullGround = this.leftGround && this.rightGround;
    this.ground = this.leftGround || this.rightGround;

    if (this.ground) {
      if (sprite.forces.gravity)
        sprite.forces.gravity.reset();

      if (sprite.forces.jump)
        sprite.forces.jump.reset();

      sprite.position.y = this.ground.y - sprite.height;
    }
  }

  /**
   * Get platform at position.
   *
   * @param {PIXI.Point} position
   * @returns {PIXI.Rectangle} rect
   */

  getPlatformAtPosition(position) {
    return this.tileMatcher.getTileAtPosition(position, {layer: 'Platforms'});
  }
}
