const _ = require("lodash");

module.exports = function mapDeep(
  value,
  iteratee,
  options = {},
  _keyPath = [],
  _objectStack = []
) {
  const postOrder = _.get(options, "postOrder", false);
  if (!postOrder) {
    value = iteratee(value, _keyPath, _objectStack);
  }
  const childrenIterator = (val, key) => {
    return mapDeep(
      val,
      iteratee,
      options,
      _.concat(_keyPath, key),
      _.concat(_objectStack, value)
    );
  };
  if (_.isPlainObject(value)) {
    value = _.mapValues(value, childrenIterator);
  } else if (_.isArray(value)) {
    value = _.map(value, childrenIterator);
  }
  if (postOrder) {
    value = iteratee(value, _keyPath, _objectStack);
  }
  return value;
};
