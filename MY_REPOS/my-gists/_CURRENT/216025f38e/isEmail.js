import isEmail from "validator/es/lib/isEmail";
  validate(name, email) {
    const validationErrors = [];
    if (!name) {
      validationErrors.push("Please provide a Name");
    }
    if (!email) {
      validationErrors.push("Please provide an Email");
    } else if (!isEmail(email)) {
      validationErrors.push("Please provide a valid Email");
    }
    return validationErrors;
  }