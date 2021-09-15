export default class TileMatcher {
  /**
   * Create a new tile matcher.
   *
   * @param {object} world
   */

  constructor(world) {
    this.world = world;
  }

  /**
   * Get tile at a specific position.
   *
   * @param {Point} position
   * @param {object} options
   * @param {Layer} options.layer
   */

  getTileAtPosition(position, options = {}) {
    const container = options.layer
      ? this.world.tiledMap.getLayerByName(options.layer)
      : this.world.tiledMap;

    const x = Math.floor(position.x / this.world.data.tilewidth);
    const y = Math.floor(position.y / this.world.data.tileheight);
    return container.tiles[y * this.world.data.width + x];
  }
}
