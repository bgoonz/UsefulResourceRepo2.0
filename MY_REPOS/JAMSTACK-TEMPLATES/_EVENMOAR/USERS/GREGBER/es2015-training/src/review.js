export default class Review {
  constructor(data) {
    this.raw = data;
  }

  /**
   * Validate the review.
   *
   * @returns {Symbol}
   */
  validate() {
    if (!this.raw.rate)
      return Review.RATE_REQUIRED;

    if (!isValidRate(this.raw.rate))
      return Review.INVALID_RATE;

    return null;
  }
}

Review.RATE_REQUIRED = Symbol('rate-required');
Review.INVALID_RATE = Symbol('invalid-rate');

/**
 * Valid a rate field.
 *
 * @param {string} rate
 * @returns {boolean}
 */
function isValidRate(rate) {
  const rateNumber = +rate;
  return Number.isInteger(rateNumber) && rateNumber >= 1 && rateNumber <= 5;
}
