export default class Animation {

  /**
   * Create a new animation.
   *
   * @param {PIXI.extras.TilingSprite} sprite
   * @param {number[]} frames
   * @param {number} fps
   */

  constructor(sprite, frames, fps) {
    this.sprite = sprite;
    this.frames = frames;
    this.fps = fps;
    this.reset();
  }

  /**
   * Update animation.
   *
   * @param {number} dt Delta time
   */

  update(dt) {
    this.duration += dt;

    if (this.duration >= (1 / this.fps)) {
      if (this.frames.length > this.currentFrame + 1)
        this.currentFrame++;
      else
        this.currentFrame = 0;

      this.duration = 0;
      this.sprite.tilePosition.x = this.frames[this.currentFrame] * this.sprite.width;
    }
  }

  /**
   * Reset animation.
   */

  reset() {
    this.currentFrame = 0;
    this.duration = 0;
  }
}
