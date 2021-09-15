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
const react_1 = __importDefault(require('react'));
const components_1 = require('@codesandbox/components');
const ModuleView_1 = require('../../icons/ModuleView');
const ProjectView_1 = require('../../icons/ProjectView');
const NewWindow_1 = require('../../icons/NewWindow');
const Back_1 = require('../../icons/Back');
const Forward_1 = require('../../icons/Forward');
const Reload_1 = require('../../icons/Reload');
const ResponsivePreview_1 = require('../../icons/ResponsivePreview');
const Tooltip_1 = __importDefault(require('../../Tooltip'));
const AddressBar_1 = __importDefault(require('../AddressBar'));
const elements_1 = require('./elements');

function Navigator({
  sandbox,
  url,
  onChange,
  onConfirm,
  onBack,
  onForward,
  onRefresh,
  isProjectView,
  toggleProjectView,
  openNewWindow,
  toggleResponsiveView,
  isInResponsivePreview,
  isScreenshotLoading,
  createPreviewComment,
  isPreviewCommentModeActive,
  zenMode,
}) {
  return react_1.default.createElement(
    elements_1.Container,
    {
      className: 'flying-container-handler',
      style: {
        cursor: 'move',
      },
    },
    react_1.default.createElement(
      elements_1.Icons,
      null,
      react_1.default.createElement(
        elements_1.Icon,
        {
          'aria-label': 'Go Back',
          disabled: !onBack,
          onClick: onBack,
        },
        react_1.default.createElement(Back_1.BackIcon, null)
      ),
      react_1.default.createElement(
        elements_1.Icon,
        {
          'aria-label': 'Go Forward',
          disabled: !onForward,
          onClick: onForward,
        },
        react_1.default.createElement(Forward_1.ForwardIcon, null)
      ),
      react_1.default.createElement(
        elements_1.Icon,
        {
          'aria-label': 'Refresh',
          onClick: onRefresh,
        },
        react_1.default.createElement(Reload_1.ReloadIcon, null)
      )
    ),
    react_1.default.createElement(
      elements_1.AddressBarContainer,
      {
        onMouseDown: (e) => {
          e.stopPropagation();
        },
      },
      react_1.default.createElement(AddressBar_1.default, {
        url: url,
        onChange: onChange,
        onConfirm: onConfirm,
      })
    ),
    createPreviewComment &&
      react_1.default.createElement(
        elements_1.IconWithBackground,
        {
          onClick: createPreviewComment,
          style: {
            color:
              isPreviewCommentModeActive && !isScreenshotLoading
                ? '#FF3B30'
                : 'currentColor',
          },
        },
        react_1.default.createElement(
          Tooltip_1.default,
          {
            delay: 0,
            content: 'Add Preview Comment (CTRL/CMD + SHIFT + S)',
          },
          isScreenshotLoading
            ? react_1.default.createElement(
                elements_1.SpinnerWrapper,
                null,
                react_1.default.createElement(components_1.Icon, {
                  name: 'spinner',
                })
              )
            : react_1.default.createElement(components_1.Icon, {
                name: 'comment',
                size: 12,
                style: {
                  top: -1,
                  position: 'relative',
                },
              })
        )
      ),
    !zenMode &&
      toggleProjectView &&
      react_1.default.createElement(
        elements_1.IconWithBackground,
        {
          onClick: toggleProjectView,
          moduleView: !isProjectView,
        },
        react_1.default.createElement(
          Tooltip_1.default,
          {
            delay: 0,
            content: isProjectView ? 'Project View' : 'Current Module View',
            placement: 'left',
          },
          isProjectView
            ? react_1.default.createElement(ProjectView_1.ProjectViewIcon, null)
            : react_1.default.createElement(ModuleView_1.ModuleViewIcon, null)
        )
      ),
    toggleResponsiveView &&
      react_1.default.createElement(
        elements_1.IconWithBackground,
        {
          onClick: toggleResponsiveView,
        },
        react_1.default.createElement(
          Tooltip_1.default,
          {
            delay: 0,
            content: 'Toggle Responsive Preview',
          },
          react_1.default.createElement(ResponsivePreview_1.ResponsivePreview, {
            active: isInResponsivePreview,
          })
        )
      ),
    openNewWindow &&
      react_1.default.createElement(
        elements_1.IconWithBackground,
        {
          onClick: openNewWindow,
        },
        react_1.default.createElement(
          Tooltip_1.default,
          {
            delay: 0,
            content: 'Open In New Window',
          },
          react_1.default.createElement(NewWindow_1.NewWindowIcon, null)
        )
      )
  );
}
exports.default = Navigator;
