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
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.PreferenceText = void 0;
const react_1 = require('react');
const components_1 = require('@codesandbox/components');
exports.PreferenceText = (_a) => {
  var { isTextArea, placeholder, setValue, value } = _a,
    props = __rest(_a, ['isTextArea', 'placeholder', 'setValue', 'value']);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return react_1.createElement(
    isTextArea ? components_1.Textarea : components_1.Input,
    Object.assign(
      {
        onChange: handleChange,
        placeholder,
        value,
      },
      props
    )
  );
};
