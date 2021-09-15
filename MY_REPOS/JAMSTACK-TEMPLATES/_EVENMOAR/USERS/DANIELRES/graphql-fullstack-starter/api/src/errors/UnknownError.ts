import SafeError from "./SafeError";

export default class UnknownError extends SafeError {
  constructor({ message = "Unknown error" } = {}) {
    super();
    this.message = message;
  }
}
