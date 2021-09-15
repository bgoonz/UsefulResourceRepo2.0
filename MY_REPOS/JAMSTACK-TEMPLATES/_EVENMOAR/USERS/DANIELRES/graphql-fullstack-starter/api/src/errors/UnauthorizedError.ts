import SafeError from "./SafeError";

export default class UnauthorizedError extends SafeError {
  constructor(message = "Unauthorized") {
    super();
    this.message = message;
  }
}
