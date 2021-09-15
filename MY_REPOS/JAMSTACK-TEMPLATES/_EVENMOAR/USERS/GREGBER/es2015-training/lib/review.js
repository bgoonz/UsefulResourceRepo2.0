'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Review = (function () {
  function Review(data) {
    _classCallCheck(this, Review);

    this.raw = data;
  }

  /**
   * Validate the review.
   *
   * @returns {Symbol}
   */

  _createClass(Review, [{
    key: 'validate',
    value: function validate() {
      if (!this.raw.rate) return Review.RATE_REQUIRED;

      if (!isValidRate(this.raw.rate)) return Review.INVALID_RATE;

      return null;
    }
  }]);

  return Review;
})();

exports.default = Review;

Review.RATE_REQUIRED = Symbol('rate-required');
Review.INVALID_RATE = Symbol('invalid-rate');

/**
 * Valid a rate field.
 *
 * @param {string} rate
 * @returns {boolean}
 */
function isValidRate(rate) {
  var rateNumber = +rate;
  return Number.isInteger(rateNumber) && rateNumber >= 1 && rateNumber <= 5;
}