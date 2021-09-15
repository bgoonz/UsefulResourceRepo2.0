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
exports.ThemeProvider = exports.makeTheme = exports.getThemes = void 0;
const deepmerge_1 = __importDefault(require('deepmerge'));
/**
 * There are 3 layers to our component styles.
 *
 * design language - spacing, fontsizes, radii, etc.
 * vscode theme - color tokens
 * polyfill - color tokens missing from vscode
 */
const react_1 = __importDefault(require('react'));
const styled_components_1 = require('styled-components');
const theme_1 = __importDefault(require('../../design-language/theme'));
const themes_1 = __importDefault(require('../../themes'));
const polyfill_theme_1 = __importDefault(require('../../utils/polyfill-theme'));
const codesandbox_black_1 = __importDefault(
  require('../../themes/codesandbox-black')
);
const Tooltip_1 = require('../Tooltip');
const Menu_1 = require('../Menu');
const SkipNav_1 = require('../SkipNav');
exports.getThemes = () => {
  const results = themes_1.default.map((theme) =>
    Object.assign(
      {
        name: theme.name,
      },
      theme.content
    )
  );
  return results.filter((a) => a);
};
const guessType = (theme) => {
  if (theme.type) return theme.type;
  if (theme.name && theme.name.toLowerCase().includes('light')) return 'light';
  return 'dark';
};
exports.makeTheme = (vsCodeTheme = {}, name) => {
  // Our interface does not map 1-1 with vscode.
  // To add styles that remain themeable, we add
  // some polyfills to the theme tokens.
  const polyfilledVSCodeColors = polyfill_theme_1.default(vsCodeTheme);
  // merge the design language and vscode theme
  const theme = deepmerge_1.default(theme_1.default, {
    colors: polyfilledVSCodeColors,
  });
  const type = guessType(vsCodeTheme);
  if (name) {
    return Object.assign(
      {
        name,
        type,
      },
      theme
    );
  }
  return theme;
};
exports.ThemeProvider = ({ theme = codesandbox_black_1.default, children }) => {
  const usableTheme = react_1.default.useMemo(
    () => exports.makeTheme(theme),
    [theme]
  );
  // the resizer lives outside the sidebar
  // to apply the right color to the resizer
  // we create a global style to be applied to it
  const ExternalStyles = styled_components_1.createGlobalStyle`
    :root {
      --reach-menu-button: 1;
      --reach-tooltip: 1;
      --reach-skip-nav: 1;
    }

    .Resizer {
      background-color: ${usableTheme.colors.sideBar.border} !important;
    }

    .editor-comments-highlight {
      background-color: ${usableTheme.colors.button.background};
      opacity: 0.2
    }

  `;
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(ExternalStyles, null),
    react_1.default.createElement(
      styled_components_1.ThemeProvider,
      {
        theme: usableTheme,
      },
      react_1.default.createElement(Tooltip_1.TooltipStyles, null),
      react_1.default.createElement(Menu_1.MenuStyles, null),
      react_1.default.createElement(SkipNav_1.SkipNavStyles, null),
      children
    )
  );
};
