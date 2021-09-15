'use strict';

var _reviewList = require('./review-list');

var _reviewList2 = _interopRequireDefault(_reviewList);

var _movieReview = require('./movie-review');

var _movieReview2 = _interopRequireDefault(_movieReview);

var _domUtil = require('./dom-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var rateForm = document.getElementById('rateForm');
var reviews = window.reviews = new _reviewList2.default();
var elementReviews = new WeakMap();

function getReviewForElement(element) {
  return elementReviews.get(element);
}

window.getReviewForElement = getReviewForElement;

var ElementWithClass = new Proxy({}, {
  get: function get(target, propKey) {
    return [].concat(_toConsumableArray(document.getElementsByClassName(propKey)));
  }
});

Object.assign(window, { ElementWithClass: ElementWithClass });

// Display header 3 sec later
(0, _domUtil.delay)(3000).then(function () {
  return fetch('/header.html');
}).then(function (res) {
  return res.text();
}).then(function (text) {
  return document.querySelector('header').innerHTML = text;
});

rateForm.addEventListener('submit', function (event) {
  event.preventDefault();

  var movie = rateForm.movie.value;
  var rate = rateForm.rate.value;
  var buzz = rateForm.buzz.value;

  var review = new _movieReview2.default({ movie: movie, rate: rate, buzz: buzz });
  var invalidReason = reviews.add(review);

  function getMessage() {
    switch (invalidReason) {
      case _reviewList2.default.MOVIE_ALREADY_EXIST:
        return 'Movie already exist';
      case _movieReview2.default.MOVIE_REQUIRED:
        return 'Movie required.';
      case _movieReview2.default.RATE_REQUIRED:
        return 'Rate required.';
      case _movieReview2.default.INVALID_RATE:
        return 'Invalid rate ' + rate + '.';
      case _movieReview2.default.INVALID_BUZZ:
        return 'Invalid buzz words ' + buzz + '.';
      case null:
        return 'The movie ' + movie + ' has been rated ' + rate + '!';
      default:
        return 'Unknown error';
    }
  }

  Array.from(document.getElementsByClassName('form-group')).forEach(function (formGroup) {
    return formGroup.classList[invalidReason ? 'add' : 'remove']('has-error');
  });

  if (!invalidReason) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = reviews[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _review = _step.value;

        console.log(_review + '');
      }
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
  }

  // Display alert message
  var alert = rateForm.querySelector('.alert');
  (0, _domUtil.setElementStyle)(alert, { display: 'block' });
  alert.classList.toggle('alert-danger', invalidReason);
  alert.classList.toggle('alert-success', !invalidReason);
  alert.innerHTML = getMessage();
  (0, _domUtil.delay)(2000).then(function () {
    return (0, _domUtil.setElementStyle)(alert, { display: 'none' });
  });

  // Display buzz words
  var buzzWords = document.querySelector('#buzzWords');
  buzzWords.innerHTML = [].concat(_toConsumableArray(reviews.buzzWords)).join(', ');

  // Clear reviews
  var reviewsElement = document.querySelector('#reviews');
  reviewsElement.innerHTML = '';

  // Display reviews
  [].concat(_toConsumableArray(reviews)).forEach(function (review) {
    var reviewElement = document.createElement('div');
    reviewElement.innerHTML = String(review);
    reviewsElement.appendChild(reviewElement);
    elementReviews.set(reviewElement, review);
  });

  // Features
  if (movie.startsWith('007')) new Audio('http://downloadwap.com/mp3tones/rtones/new/tv-movie/james_bond_007_original-4820.mp3').play();
  if (movie.includes('dark')) (0, _domUtil.setElementStyle)(document.body, { background: 'black' });
});

// co example

// function co(genFunc) {
//   const genObj = genFunc();
//   const run = previousPromise => {
//     if (typeof previousPromise === 'undefined') {
//       const {value, done} = genObj.next();
//       if (!done)
//         run(value);
//     } else {
//       previousPromise.then(res => {
//         const {value, done} = genObj.next(res);
//         if (!done)
//           run(value);
//       });
//     }
//
//   };
//
//   run();
// }
//
// co(function* () {
//   yield delay(3000);
//   let res = yield fetch('/header.html');
//   let text = yield res.text();
//   document.querySelector('header').innerHTML = text;
// });