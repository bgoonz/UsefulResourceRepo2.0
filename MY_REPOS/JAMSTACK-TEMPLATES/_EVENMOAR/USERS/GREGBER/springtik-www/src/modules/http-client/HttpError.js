export default class HttpError extends Error {
  /**
   * Create a new HttpError.
   *
   * @param {object} options
   * @param {object} options.response
   * @param {object} options.request
   */
  constructor({response, request}) {
    super();
    this.message = `HTTP error ${response.status}`;
    Object.assign(this, {response, request});
  }
}
