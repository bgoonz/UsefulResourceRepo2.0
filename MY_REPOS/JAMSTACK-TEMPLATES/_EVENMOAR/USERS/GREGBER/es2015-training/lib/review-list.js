'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReviewList = (function () {
  function ReviewList() {
    _classCallCheck(this, ReviewList);

    this.reviews = [];
    this.buzzWords = new Set();
  }

  _createClass(ReviewList, [{
    key: 'add',
    value: function add(review) {
      var invalidReason = review.validate() || (this.reviews.find(function (r) {
        return r.raw.movie === review.raw.movie;
      }) ? ReviewList.MOVIE_ALREADY_EXIST : null);

      if (invalidReason) return invalidReason;

      this.reviews.push(review);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = review.getBuzzWords()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var word = _step.value;

          this.buzzWords.add(word);
        } // Same
        // review.getBuzzWords()
        // .forEach(word => this.buzzWords.add(word))
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: Symbol.iterator,
    value: regeneratorRuntime.mark(function value() {
      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.reviews, 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, value, this);
    })
  }]);

  return ReviewList;
})();

exports.default = ReviewList;

ReviewList.prototype = new Proxy(ReviewList.prototype, {
  get: function get(target, propKey, receiver) {
    if (!propKey || !propKey.match) return Reflect.get.apply(null, arguments);

    var matches = propKey.match(/^get(.+)BuzzWords$/);

    if (!matches) return Reflect.get.apply(null, arguments);

    var _matches = _slicedToArray(matches, 2);

    var movie = _matches[1];

    return function () {
      return receiver.reviews.filter(function (review) {
        return review.raw.movie.toLowerCase() === movie.toLowerCase();
      }).reduce(function (words, review) {
        return words.concat([].concat(_toConsumableArray(review.getBuzzWords())));
      }, []);
    };
  }
});

ReviewList.MOVIE_ALREADY_EXIST = Symbol('already-exist');