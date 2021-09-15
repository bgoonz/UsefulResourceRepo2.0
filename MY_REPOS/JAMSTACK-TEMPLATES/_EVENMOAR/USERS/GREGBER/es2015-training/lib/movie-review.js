'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _review = require('./review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovieReview = (function (_Review) {
  _inherits(MovieReview, _Review);

  function MovieReview() {
    _classCallCheck(this, MovieReview);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MovieReview).apply(this, arguments));
  }

  _createClass(MovieReview, [{
    key: 'validate',

    /**
     * Validate the review.
     *
     * @returns {Symbol}
     */
    value: function validate() {
      var invalidReason = _get(Object.getPrototypeOf(MovieReview.prototype), 'validate', this).call(this);

      if (invalidReason) return invalidReason;

      if (!this.raw.movie) return MovieReview.MOVIE_REQUIRED;

      if (!isValidBuzzWords(this.getBuzzWords())) return MovieReview.INVALID_BUZZ;

      return null;
    }

    /**
     * Get buzz words.
     *
     * @returns {Iterable}
     */

  }, {
    key: 'getBuzzWords',
    value: function getBuzzWords() {
      return this.raw.buzz.split(',').map(function (word) {
        return word.trim().toLowerCase();
      }).filter(function (word) {
        return word;
      });
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Movie ' + this.raw.movie + ', rated ' + this.raw.rate + ', buzz ' + this.raw.buzz;
    }
  }]);

  return MovieReview;
})(_review2.default);

exports.default = MovieReview;

MovieReview.MOVIE_REQUIRED = Symbol('movie-required');
MovieReview.INVALID_BUZZ = Symbol('invalid-feeling');

/**
 * Valid buzz words.
 *
 * @type {string[]}
 */
var VALID_BUZZ_WORDS = ['amazing', 'hilarious', 'sad', 'bad'];

/**
 * Test if buzz words are valid.
 *
 * @param {string[]} words
 * @returns {boolean}
 */
function isValidBuzzWords(words) {
  return words.every(function (word) {
    return VALID_BUZZ_WORDS.some(function (w) {
      return w === word;
    });
  });
}