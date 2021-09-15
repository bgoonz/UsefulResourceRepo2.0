export default class ApiError extends Error {
  constructor(message, code, status) {
    super();
    this.message = message;
    this.code = code;
    this.status = status;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
