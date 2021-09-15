const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEmployeeInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isNumeric(data.mobile)) {
    errors.mobile = "Mobile number can only have numbers";
  }

  if (!Validator.isLength(data.mobile, { min: 10, max: 10 })) {
    errors.mobile = "Mobile number must have 10 digits";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "Mobile field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
