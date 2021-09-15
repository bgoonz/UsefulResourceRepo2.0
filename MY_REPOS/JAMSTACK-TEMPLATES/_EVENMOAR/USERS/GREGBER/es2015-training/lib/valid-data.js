'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var _ref$movie = _ref.movie;
  var movie = _ref$movie === undefined ? null : _ref$movie;
  var _ref$rate = _ref.rate;
  var rate = _ref$rate === undefined ? null : _ref$rate;
  var _ref$buzzWords = _ref.buzzWords;
  var buzzWords = _ref$buzzWords === undefined ? [] : _ref$buzzWords;

  if (!movie) return MOVIE_REQUIRED;

  if (!rate) return RATE_REQUIRED;

  var rateNumber = +rate;

  if (!Number.isInteger(rateNumber) || rateNumber < 1 || rateNumber > 5) return INVALID_RATE;

  if (buzzWords.length && !validateBuzzWords.apply(undefined, _toConsumableArray(buzzWords))) return INVALID_BUZZ;

  return null;
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var MOVIE_REQUIRED = exports.MOVIE_REQUIRED = Symbol('movie-required');
var RATE_REQUIRED = exports.RATE_REQUIRED = Symbol('rate-required');
var INVALID_RATE = exports.INVALID_RATE = Symbol('invalid-rate');
var INVALID_BUZZ = exports.INVALID_BUZZ = Symbol('invalid-feeling');

var VALID_BUZZ_WORDS = ['amazing', 'hilarious', 'sad', 'bad'];

var validateBuzzWords = function validateBuzzWords() {
  for (var _len = arguments.length, words = Array(_len), _key = 0; _key < _len; _key++) {
    words[_key] = arguments[_key];
  }

  return words.every(isValidBuzzWord);
};

var isValidBuzzWord = function isValidBuzzWord(word) {
  return VALID_BUZZ_WORDS.some(function (w) {
    return w === word;
  });
};

;