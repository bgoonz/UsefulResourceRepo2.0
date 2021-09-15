'use strict';
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
exports.PreferenceNumber = void 0;
const react_1 = __importDefault(require('react'));
const components_1 = require('@codesandbox/components');
exports.PreferenceNumber = ({ setValue, step, style, value, max, min }) => {
  const handleChange = ({ target }) => {
    if (!Number.isNaN(+target.value)) {
      setValue(+target.value);
    }
  };
  return react_1.default.createElement(components_1.Input, {
    onChange: handleChange,
    step: step,
    style: Object.assign(
      {
        width: '3rem',
      },
      style
    ),
    type: 'number',
    value: value,
    max: max,
    min: min,
  });
};
