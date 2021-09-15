'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', {
          enumerable: true,
          value: v,
        });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
exports.Textarea = exports.TextareaComponent = void 0;
const react_1 = __importStar(require('react'));
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const rect_1 = __importDefault(require('@reach/rect'));
const __1 = require('../..');
exports.TextareaComponent = styled_components_1.default(__1.Input).attrs({
  as: 'textarea',
})(
  css_1.default({
    minHeight: 64,
    padding: 2,
    width: '100%',
    resize: 'none',
    lineHeight: 1.2,
    // autosize styles
    overflow: 'hidden',
    transitionProperty: 'height',
    transitionDuration: (theme) => theme.speeds[2],
  })
);
const Count = styled_components_1.default.div(({ limit }) =>
  css_1.default({
    fontSize: 2,
    paddingTop: 1,
    color: limit ? 'errorForeground' : 'input.placeholderForeground',
    alignSelf: 'flex-end',
  })
);
exports.Textarea = react_1.default.forwardRef((_a, ref) => {
  var {
      maxLength,
      defaultValue = '',
      value = '',
      onChange,
      onKeyPress,
      autosize,
    } = _a,
    props = __rest(_a, [
      'maxLength',
      'defaultValue',
      'value',
      'onChange',
      'onKeyPress',
      'autosize',
    ]);
  const [innerValue, setInnerValue] = react_1.default.useState(defaultValue);
  /**
   * To support both contolled and uncontrolled components
   * We sync props.value with internalValue
   */
  react_1.default.useEffect(
    function syncValue() {
      setInnerValue(value || defaultValue);
    },
    [value, defaultValue]
  );
  const internalOnChange = (event) => {
    if (onChange) onChange(event);
    setInnerValue(event.target.value);
  };
  const Wrapper = react_1.useCallback(
    ({ children }) =>
      maxLength
        ? react_1.default.createElement(
            __1.Stack,
            {
              direction: 'vertical',
              css: {
                width: '100%',
              },
            },
            children
          )
        : children,
    [maxLength]
  );
  return react_1.default.createElement(
    Wrapper,
    null,
    autosize
      ? react_1.default.createElement(
          Autosize,
          {
            value: innerValue,
            style: props.style,
          },
          (height) =>
            react_1.default.createElement(
              exports.TextareaComponent,
              Object.assign(
                {
                  value: innerValue,
                  onChange: internalOnChange,
                  maxLength: maxLength,
                  ref: ref,
                },
                props,
                {
                  style: Object.assign(Object.assign({}, props.style || {}), {
                    height,
                  }),
                }
              )
            )
        )
      : react_1.default.createElement(
          exports.TextareaComponent,
          Object.assign(
            {
              value: innerValue,
              onChange: internalOnChange,
              maxLength: maxLength,
              ref: ref,
            },
            props
          )
        ),
    maxLength
      ? react_1.default.createElement(
          Count,
          {
            limit: maxLength <= innerValue.length,
          },
          innerValue.length,
          '/',
          maxLength
        )
      : null
  );
});
const Autosize = (_a) => {
  var { value, style = {} } = _a,
    props = __rest(_a, ['value', 'style']);
  return react_1.default.createElement(rect_1.default, null, ({ rect, ref }) =>
    react_1.default.createElement(
      react_1.default.Fragment,
      null,
      react_1.default.createElement(
        'span',
        {
          style: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: '1px',
            margin: '-1px',
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            // Do not use "1px" as we need to use pre-wrap to
            // deal with height resize related to not explicitly
            // using linebreak (ENTER) as well
            // width: "1px",
            // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
            whiteSpace: 'nowrap',
            wordWrap: 'normal',
          },
        },
        react_1.default.createElement(
          __1.Text,
          {
            block: true,
            ref: ref,
            size: 3,
            style: Object.assign(
              {
                // match textarea styles
                whiteSpace: 'pre-wrap',
                lineHeight: 1.2,
                minHeight: 64,
                padding: 8,
              },
              style
            ),
          },
          value + ' '
        )
      ),
      props.children(rect ? rect.height + 20 : 0)
    )
  );
};
