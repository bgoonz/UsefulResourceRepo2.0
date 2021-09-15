export class Validator {
  static fail(error) {
    const validator = new Validator();
    validator.push(error);
    return validator;
  }

  static succeed() {
    return new Validator();
  }

  get didFail() {
    return this.errors.length > 0;
  }

  get didSucceed() {
    return this.errors.length == 0;
  }

  get message() {
    return this.errors.join(" ");
  }

  constructor() {
    this.errors = [];
  }

  push(error) {
    if (error instanceof Validator) {
      for (let message of error.errors) {
        this.errors.push(message);
      }
    } else {
      this.errors.push(error);
    }
  }

  assert(condition, error) {
    if (condition) {
      return;
    }

    this.push(error);
  }
}
