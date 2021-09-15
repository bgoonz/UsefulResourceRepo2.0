import { LeConfigValidationError } from "./errors/LeConfigValidationError";
import * as obj from "./helpers/object";

export const validate = (config) => {
  let errors = [];

  const replacer = (key, v) => {
    const [value, [convert, validate, error]] = v;

    const converted = convert(value);

    const isValid = validate(converted);
    if (!isValid) errors = [...errors, { key, error, actual: value }];

    return converted;
  };

  const result = obj.walk(config, replacer);

  if (errors.length) throw new LeConfigValidationError(errors);
  return result;
};
