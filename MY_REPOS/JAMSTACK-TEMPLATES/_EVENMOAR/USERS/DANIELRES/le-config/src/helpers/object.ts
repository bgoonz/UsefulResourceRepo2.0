const isObject = (maybeObj) =>
  maybeObj instanceof Object && maybeObj.constructor === Object;

export const walk = (obj, fn) =>
  Object.entries(obj).reduce((acc, [k, val]) => {
    return {
      ...acc,
      [k]: isObject(val) ? walk(val, fn) : fn(k, val),
    };
  }, {});
