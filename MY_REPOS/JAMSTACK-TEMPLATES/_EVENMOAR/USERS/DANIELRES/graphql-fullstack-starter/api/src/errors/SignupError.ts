import SafeError from "./SafeError";

export default class SignupError extends SafeError {
  constructor(message = "Signup error") {
    super();
    this.message = message;
  }
}
