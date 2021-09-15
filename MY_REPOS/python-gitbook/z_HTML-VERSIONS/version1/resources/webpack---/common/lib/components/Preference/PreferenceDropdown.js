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
exports.PreferenceDropdown = void 0;
const react_1 = __importDefault(require('react'));
const components_1 = require('@codesandbox/components');
exports.PreferenceDropdown = ({ mapName, options, setValue, value }) => {
  const handleChange = ({ target }) => {
    setValue(target.value);
  };
  return react_1.default.createElement(
    components_1.Select,
    {
      onChange: handleChange,
      value: value,
    },
    options.map((option) =>
      react_1.default.createElement(
        'option',
        {
          key: option,
          value: option,
        },
        mapName ? mapName(option) : option
      )
    )
  );
};
