import Joi from "joi-browser";

export default (values, schema) =>
  Joi.validate(values, schema, { abortEarly: false }, (errors, inputs) =>
    errors.details.reduce(
      (acc, error) => ({ ...acc, [error.path]: error.message }),
      {}
    )
  );
