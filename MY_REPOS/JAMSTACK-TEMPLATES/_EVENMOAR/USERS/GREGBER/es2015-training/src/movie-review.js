import Review from './review';

export default class MovieReview extends Review {
  /**
   * Validate the review.
   *
   * @returns {Symbol}
   */
  validate() {
    const invalidReason = super.validate();

    if (invalidReason)
      return invalidReason;

    if (!this.raw.movie)
      return MovieReview.MOVIE_REQUIRED;

    if (!isValidBuzzWords(this.getBuzzWords()))
      return MovieReview.INVALID_BUZZ;

    return null;
  }

  /**
   * Get buzz words.
   *
   * @returns {Iterable}
   */
  getBuzzWords() {
    return this.raw.buzz
      .split(',')
      .map(word => word.trim().toLowerCase())
      .filter(word => word);
  }

  toString() {
    return `Movie ${this.raw.movie}, rated ${this.raw.rate}, buzz ${this.raw.buzz}`;
  }
}

MovieReview.MOVIE_REQUIRED = Symbol('movie-required');
MovieReview.INVALID_BUZZ = Symbol('invalid-feeling');

/**
 * Valid buzz words.
 *
 * @type {string[]}
 */
const VALID_BUZZ_WORDS = ['amazing', 'hilarious', 'sad', 'bad'];

/**
 * Test if buzz words are valid.
 *
 * @param {string[]} words
 * @returns {boolean}
 */
function isValidBuzzWords(words) {
  return words.every(word => VALID_BUZZ_WORDS.some(w => w === word));
}
