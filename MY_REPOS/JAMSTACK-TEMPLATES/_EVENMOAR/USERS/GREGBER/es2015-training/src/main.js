import ReviewList from './review-list';
import MovieReview from './movie-review';
import {setElementStyle, delay} from './dom-util';

const rateForm = document.getElementById('rateForm');
const reviews = window.reviews = new ReviewList();
const elementReviews = new WeakMap();

function getReviewForElement(element) {
  return elementReviews.get(element);
}

window.getReviewForElement = getReviewForElement;


const ElementWithClass = new Proxy({}, {
  get(target, propKey) {
    return [...document.getElementsByClassName(propKey)];
  }
});

Object.assign(window, {ElementWithClass})

// Display header 3 sec later
delay(3000)
  .then(() => fetch('/header.html'))
  .then(res => res.text())
  .then(text => document.querySelector('header').innerHTML = text);

rateForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const {
    movie: {value: movie},
    rate: {value: rate},
    buzz: {value: buzz}
  } = rateForm;

  const review = new MovieReview({movie, rate, buzz});
  const invalidReason = reviews.add(review);

  function getMessage() {
    switch (invalidReason) {
      case ReviewList.MOVIE_ALREADY_EXIST:
        return 'Movie already exist';
      case MovieReview.MOVIE_REQUIRED:
        return `Movie required.`;
      case MovieReview.RATE_REQUIRED:
        return `Rate required.`
      case MovieReview.INVALID_RATE:
        return `Invalid rate ${rate}.`;
      case MovieReview.INVALID_BUZZ:
        return `Invalid buzz words ${buzz}.`;
      case null:
        return `The movie ${movie} has been rated ${rate}!`;
      default:
        return 'Unknown error';
    }
  }

  Array.from(document.getElementsByClassName('form-group'))
    .forEach(formGroup =>
      formGroup.classList[invalidReason ? 'add' : 'remove']('has-error')
    );

  if (!invalidReason) {
    for (let review of reviews)
      console.log(review + '');
  }

  // Display alert message
  const alert = rateForm.querySelector('.alert');
  setElementStyle(alert, {display: 'block'});
  alert.classList.toggle('alert-danger', invalidReason);
  alert.classList.toggle('alert-success', !invalidReason);
  alert.innerHTML = getMessage();
  delay(2000).then(() => setElementStyle(alert, {display: 'none'}));

  // Display buzz words
  const buzzWords = document.querySelector('#buzzWords');
  buzzWords.innerHTML = [...reviews.buzzWords].join(', ');

  // Clear reviews
  const reviewsElement = document.querySelector('#reviews');
  reviewsElement.innerHTML = '';

  // Display reviews
  [...reviews].forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.innerHTML = String(review);
    reviewsElement.appendChild(reviewElement);
    elementReviews.set(reviewElement, review);
  });

  // Features
  if (movie.startsWith('007'))
    new Audio('http://downloadwap.com/mp3tones/rtones/new/tv-movie/james_bond_007_original-4820.mp3').play();
  if (movie.includes('dark'))
    setElementStyle(document.body, {background: 'black'});
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
