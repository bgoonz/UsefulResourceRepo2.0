'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule
      ? mod
      : {
          default: mod,
        };
  };
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.decorateSelector = void 0;
const memoize_one_1 = __importDefault(require('memoize-one'));
const color_1 = __importDefault(require('color'));
const colorMethods = [
  'negate',
  'lighten',
  'darken',
  'saturate',
  'desaturate',
  'greyscale',
  'whiten',
  'blacken',
  'clearer',
  'opaquer',
  'rotate',
];
/**
 * Takes a selector that returns a color string and returns new decorated selector that calls the
 * original function to get the color and then modifies that color, ultimately returning another
 * color string.
 *
 * vy60q8l043
 */
const addModifier =
  (fn, method, ...modifierArgs) =>
  (...args) =>
    color_1
      .default(fn(...args))
      [method](...modifierArgs)
      .rgbString();
/**
 * Add useful methods directly to selector function, as well as put an rgbString() call at the end
 * @param selector
 */
exports.decorateSelector = (selector) => {
  // add member functions to our selector
  colorMethods.forEach((method) => {
    selector[method] = memoize_one_1.default((...args) =>
      exports.decorateSelector(addModifier(selector, method, ...args))
    );
  });
  return selector;
};
