'use strict';

module.exports = function cssExtend(options) {
  options = options || {};

  return function cssExtend(css) {
    return css;
  };
}
