export default class SafeError extends Error {
  isSafeError: boolean;
  message: string;

  constructor() {
    super();
    this.name = this.constructor.name;
    this.isSafeError = true;
    this.message = "";
  }
}
