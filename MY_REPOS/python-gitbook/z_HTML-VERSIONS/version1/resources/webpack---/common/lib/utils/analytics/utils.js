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
exports.isAllowedEvent =
  exports.DO_NOT_TRACK_ENABLED =
  exports.WHITELISTED_VSCODE_EVENTS =
  exports.getHashedUserId =
  exports.global =
  exports.debug =
  exports.ANONYMOUS_UID_KEY =
    void 0;
const debug_1 = __importDefault(require('../../utils/debug'));
const hash_1 = __importDefault(require('../hash'));
exports.ANONYMOUS_UID_KEY = 'codesandbox-anonymous-uid';
exports.debug = debug_1.default('cs:analytics');
exports.global = typeof window !== 'undefined' ? window : {};

function getHashedUserId(userId) {
  return hash_1.default(userId);
}
exports.getHashedUserId = getHashedUserId;
exports.WHITELISTED_VSCODE_EVENTS = [
  'codesandbox.preview.toggle',
  'workbench.action.splitEditor',
  'workbench.action.toggleSidebarVisibility',
  'codesandbox.sandbox.new',
  'workbench.action.files.saveAs',
  'editor.action.addCommentLine',
  'codesandbox.sandbox.exportZip',
  'codesandbox.preferences',
  'codesandbox.sandbox.fork',
  'codesandbox.help.documentation',
  'codesandbox.help.github',
  'view.preview.flip',
  'codesandbox.search',
  'workbench.action.splitEditorLeft',
  'codesandbox.dashboard',
  'workbench.action.toggleCenteredLayout',
  'workbench.action.toggleMenuBar',
  'codesandbox.explore',
  'editor.action.toggleTabFocusMode',
  'workbench.action.splitEditorUp',
  'workbench.action.toggleSidebarPosition',
  'workbench.action.toggleActivityBarVisibility',
  'workbench.action.toggleStatusbarVisibility',
  'codesandbox.dependencies.add',
  'codesandbox.help.open-issue',
  'codesandbox.action.search',
  'workbench.action.editorLayoutThreeColumns',
  'breadcrumbs.toggleToOn',
  'workbench.action.openSettings2',
  'workbench.action.globalSettings',
  'workbench.action.editorLayoutTwoRows',
  'workbench.action.editorLayoutTwoByTwoGrid',
  'editor.action.showContextMenu',
  'toggleVim',
  'codesandbox.help.spectrum',
  'codesandbox.help.feedback',
  'workbench.action.webview.openDeveloperTools',
  'workbench.action.editorLayoutThreeRows',
  'codesandbox.help.twitter',
  'workbench.action.editorLayoutTwo',
  'codesandbox.preview.external',
  'notifications.showList',
  'workbench.action.editor.changeEncoding',
  'editor.action.indentationToTabs',
  'workbench.action.maximizeEditor',
  'editor.action.indentationToSpaces',
  'revealFilesInOS',
  'keybindings.editor.searchKeyBindings',
  'notifications.hideList',
  'workbench.action.terminal.focus',
  'workbench.action.console.focus',
  'workbench.action.openRecent',
  'code-runner.run',
];
const isDoNotTrackEnabled = () => {
  try {
    if (typeof window !== 'undefined') {
      let localStorageValue = true;
      try {
        localStorageValue =
          typeof localStorage !== 'undefined' &&
          localStorage.getItem('DO_NOT_TRACK_ENABLED') === 'true';
      } catch (e) {
        /* ignore */
      }
      return Boolean(
        // @ts-ignore
        exports.global.doNotTrack === '1' ||
          // @ts-ignore
          exports.global.navigator.doNotTrack === '1' ||
          // @ts-ignore
          exports.global.navigator.msDoNotTrack === '1' ||
          localStorageValue ||
          process.env.NODE_ENV === 'development' ||
          process.env.STAGING
      );
    }
    return true;
  } catch (e) {
    return false;
  }
};
exports.DO_NOT_TRACK_ENABLED = isDoNotTrackEnabled();
exports.isAllowedEvent = (eventName, secondArg) => {
  try {
    if (eventName === 'VSCode - workbenchActionExecuted') {
      return exports.WHITELISTED_VSCODE_EVENTS.includes(secondArg.id);
    }
    return true;
  } catch (e) {
    return true;
  }
};
