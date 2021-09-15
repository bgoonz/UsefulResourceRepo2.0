import SafeError from "./SafeError";

export default class SigninError extends SafeError {
  constructor(message = "Email and password don't match") {
    super();
    this.message = message;
  }
}
