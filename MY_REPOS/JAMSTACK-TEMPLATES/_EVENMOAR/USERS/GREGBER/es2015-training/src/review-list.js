export default class ReviewList {
  constructor() {
    this.reviews = [];
    this.buzzWords = new Set();
  }

  add(review) {
    const invalidReason = review.validate()
      || (this.reviews.find(r => r.raw.movie === review.raw.movie)
        ? ReviewList.MOVIE_ALREADY_EXIST : null);

    if (invalidReason)
      return invalidReason;

    this.reviews.push(review);

    for (let word of review.getBuzzWords())
      this.buzzWords.add(word);

    // Same
    // review.getBuzzWords()
      // .forEach(word => this.buzzWords.add(word))

    return null;
  }

  * [Symbol.iterator]() {
    yield* this.reviews;
  }
}

ReviewList.prototype = new Proxy(ReviewList.prototype, {
  get(target, propKey, receiver) {
    if (!propKey || !propKey.match)
      return Reflect.get.apply(null, arguments);

    const matches = propKey.match(/^get(.+)BuzzWords$/);

    if (!matches)
      return Reflect.get.apply(null, arguments);

    let [,movie] = matches;
    return () => receiver.reviews
      .filter(review =>
        review.raw.movie.toLowerCase() === movie.toLowerCase()
      )
      .reduce((words, review) =>
        words.concat([...review.getBuzzWords()]),
      []);
  }
});

ReviewList.MOVIE_ALREADY_EXIST = Symbol('already-exist');
