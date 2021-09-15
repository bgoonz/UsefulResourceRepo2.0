export * from "../src/errors/LeConfigValidationError";
export * as checks from "./checks";
export * from "./validate";

import { handleError } from "../src/errors/LeConfigValidationError";
import { validate } from "./validate";
export const makeConfig = (definition) => {
  let config;

  try {
    config = validate(definition);
  } catch (error) {
    handleError(error);
  }

  return config;
};
