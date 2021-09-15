class ServerError extends Error {
  constructor(code, message, originalError) {
    super();
    this.code = code;
    this.message = message;
    console.error("SERVER ERROR: ", originalError);
  }
}

module.exports = (...args) => new ServerError(...args);
