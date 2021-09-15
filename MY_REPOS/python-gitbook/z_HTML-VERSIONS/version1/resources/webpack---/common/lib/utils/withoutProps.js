'use strict';
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule
      ? mod
      : {
          default: mod,
        };
  };
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.withoutProps = void 0;
// Based on https://github.com/styled-components/styled-components/pull/2093#issuecomment-461510706
const react_1 = __importDefault(require('react'));
exports.withoutProps = (...omitProps) => {
  const omitSingle = (object = {}, key) => {
    if (key === null || key === undefined || !(key in object)) return object;
    const _a = object,
      _b = key,
      deleted = _a[_b],
      otherKeys = __rest(_a, [typeof _b === 'symbol' ? _b : _b + '']);
    return otherKeys;
  };
  const omit = (object = {}, keys) => {
    if (!keys) return object;
    if (Array.isArray(keys)) {
      return keys.reduce((result, key) => {
        if (key in result) {
          return omitSingle(result, key);
        }
        return result;
      }, object);
    }
    return omitSingle(object, keys);
  };
  return (Component) => {
    const componentWithoutProps = react_1.default.forwardRef((props, ref) =>
      react_1.default.createElement(
        Component,
        Object.assign(
          {
            ref: ref,
          },
          omit(props, omitProps)
        )
      )
    );
    if (Component.displayName) {
      componentWithoutProps.displayName = `${Component.displayName}WithoutProps`;
    }
    return componentWithoutProps;
  };
};
