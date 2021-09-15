import PIXI from 'pixi.js';
import 'pixi-tiled';

/**
 * Load game resources.
 *
 * @param {function} cb
 */
function load(cb) {
  PIXI.loader
    .add('world', 'src/maps/world.json')
    .load(cb);
}

export default {load};
