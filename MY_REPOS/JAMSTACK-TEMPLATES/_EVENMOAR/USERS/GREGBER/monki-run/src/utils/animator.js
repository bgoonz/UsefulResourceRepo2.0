import Animation from './animation';

export default class Animator {

  /**
   * Create a new animator.
   *
   * @param {PIXI.extras.TilingSprite} sprite
   */

  constructor(sprite) {
    this.sprite = sprite;
    this.animations = {};
    this.currentAnimation = null;
  }

  /**
   * Add a new animation for this sprite.
   *
   * @param {string} name
   * @param {number[]} frames
   * @param {number} fps
   */

  addAnimation(name, frames, fps) {
    this.animations[name] = new Animation(this.sprite, frames, fps);
  }

  /**
   * Set the current animation.
   *
   * @param {string} name
   */

  setCurrentAnimation(name) {
    if (
      this.currentAnimation
        && this.currentAnimation !== this.animations[name]
    )
      this.currentAnimation.reset();

    this.currentAnimation = name ? this.animations[name] : null;
  }

  /**
   * Animate sprite.
   *
   * @param {number} dt Delta time
   */

  update(dt) {
    if (this.currentAnimation)
      this.currentAnimation.update(dt);
  }
}
