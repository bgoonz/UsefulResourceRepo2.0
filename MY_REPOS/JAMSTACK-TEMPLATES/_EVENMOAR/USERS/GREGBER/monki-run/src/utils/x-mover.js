export default class XMover {
  /**
   * Create a new X mover.
   */
  constructor(sprite) {
    this.sprite = sprite;
  }

  /**
   * Update sprite according to direction.
   *
   * @param {number} direction
   */
  update(direction) {
    if (direction) {
      if (this.sprite.forces.velocity.value.x * direction < 0)
        this.sprite.forces.velocity.value.x = 0;

      this.sprite.forces.velocity.power.x = Math.abs(this.sprite.forces.velocity.power.x) * direction;
      this.sprite.forces.velocity.limit.x = Math.abs(this.sprite.forces.velocity.limit.x) * direction;
      this.sprite.forces.velocity.exerting = true;

      if (this.sprite.tileScale)
        this.sprite.tileScale.x = -direction;

      if (this.sprite.animator)
        this.sprite.animator.setCurrentAnimation('run');
    } else {
      this.sprite.forces.velocity.exerting = false;
      this.sprite.forces.velocity.reset();

      if (this.sprite.tilePosition)
        this.sprite.tilePosition.x = this.sprite.tileScale.x * this.sprite.width - this.sprite.width;

      if (this.sprite.animator)
        this.sprite.animator.setCurrentAnimation(null);
    }
  }
}

XMover.LEFT_DIRECTION = -1;
XMover.RIGHT_DIRECTION = 1;
