import Force from './force';

export default class ForceSet {
  /**
   * Create a new set of forces.
   *
   * @type {object} forces
   */

  constructor(forces) {
    Object.assign(this, forces);
  }

  /**
   * Update forces.
   *
   * @param {number} dt
   * @param {DisplayObject} clip
   */

  update(dt, clip) {
    for (const key in this) {
      if (this[key] instanceof Force)
        this[key].update(dt, clip);
    }
  }
}
