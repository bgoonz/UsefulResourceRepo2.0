import { superstruct } from 'superstruct';
import isObject from './utils/isObject';

class ConfigValidationError extends Error {
  constructor(error, messages) {
    super();
    const count = error.failures.length;
    this.message = `${count} errors.`;
    this.name = 'ConfigValidationError';
    this.errors = error.failures.map(f => ({
      type: f.type,
      path: f.path.join('.'),
      value: f.value,
      message: messages[f.type],
    }));
  }
}

export default checks => config => {
  const types = Object.entries(checks).reduce((acc, [k, v]) => ({ ...acc, [k]: v[0] }), {});
  const customCoercions = Object.entries(checks).reduce((acc, [k, v]) => ({ ...acc, [k]: v[1] }), {});
  const errorMessages = Object.entries(checks).reduce((acc, [k, v]) => ({ ...acc, [k]: v[2] }), {});

  const struct = superstruct({ types });

  const coercionsMap = {
    boolean: Boolean,
    number: Number,
    string: String,
    ...customCoercions,
  };

  const coerce = (rule, value) => {
    if (coercionsMap[rule]) return coercionsMap[rule](value);
    throw new Error(`Coercion rule ${rule} missing.`);
  };

  const getVars = obj =>
    Object.entries(obj).reduce((acc, [k, v]) => ({ ...acc, [k]: isObject(v) ? getVars(v) : coerce(v[1], v[0]) }), {});

  const getRules = obj =>
    Object.entries(obj).reduce((acc, [k, v]) => ({ ...acc, [k]: isObject(v) ? getRules(v) : v[1] }), {});

  const validator = struct(getRules(config));

  try {
    return validator(getVars(config));
  } catch (error) {
    throw new ConfigValidationError(error, errorMessages);
  }
};
