import PIXI from 'pixi.js';

const resolution = window.devicePixelRatio;
const backgroundColor = 0xfffff;
export default PIXI.autoDetectRenderer(800, 500, {resolution, backgroundColor});
