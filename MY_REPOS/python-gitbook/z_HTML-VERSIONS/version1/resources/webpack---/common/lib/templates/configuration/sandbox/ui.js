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
exports.ConfigWizard = void 0;
const react_1 = __importStar(require('react'));
const sortBy_1 = __importDefault(require('lodash/sortBy'));
const templates = __importStar(require('../../../templates'));
const elements_1 = require('../elements');
exports.ConfigWizard = (props) => {
  const getValue = (file, property, defaultValue) => {
    if (property.includes('.')) {
      const [parent, key] = property.split('.');
      if (!file[parent]) return defaultValue;
      const value = file[parent][key];
      return value ? value.toString() : defaultValue;
    }
    return file[property] || defaultValue;
  };
  const bindValue = react_1.useCallback(
    (file, property, defaultValue) => ({
      value: getValue(file, property, defaultValue),
      setValue: (value) => {
        let code = JSON.stringify(
          Object.assign(Object.assign({}, file), {
            [property]: value,
          }),
          null,
          2
        );
        if (property.includes('.')) {
          const [parent, key] = property.split('.');
          code = JSON.stringify(
            Object.assign(Object.assign({}, file), {
              [parent]: Object.assign(Object.assign({}, file[parent]), {
                [key]: value,
              }),
            }),
            null,
            2
          );
        }
        return props.updateFile(code);
      },
    }),
    [props.file]
  );
  const { file, sandbox } = props;
  let parsedFile;
  let error;
  try {
    parsedFile = JSON.parse(file);
  } catch (e) {
    error = e;
  }
  if (error) {
    return react_1.default.createElement(
      'div',
      null,
      'Problem parsing sandbox.config.json: ',
      error.message
    );
  }
  if (!parsedFile) {
    return react_1.default.createElement(
      'div',
      null,
      'Could not parse sandbox.config.json'
    );
  }
  const currentTemplate = templates.default(sandbox.template);
  const possibleTemplates = Object.keys(templates)
    .filter((t) => t !== 'default')
    .map((n) => templates[n]);
  const templateOptions = sortBy_1
    .default(
      possibleTemplates.filter(
        (template) =>
          template.isServer === currentTemplate.isServer &&
          template.showOnHomePage
      ),
      (template) => template.niceName
    )
    .map((template) => template.name);
  const templateNameMap = {};
  possibleTemplates.forEach((template) => {
    templateNameMap[template.name] = template.niceName;
  });
  return react_1.default.createElement(
    'div',
    null,
    react_1.default.createElement(
      elements_1.PaddedConfig,
      null,
      react_1.default.createElement(
        elements_1.ConfigItem,
        null,
        react_1.default.createElement(
          elements_1.PaddedPreference,
          Object.assign(
            {
              title: 'Infinite Loop Protection',
              type: 'boolean',
            },
            bindValue(parsedFile, 'infiniteLoopProtection')
          )
        )
      ),
      react_1.default.createElement(
        elements_1.ConfigDescription,
        null,
        'Whether we should stop execution of the code when we detect an infinite loop.'
      )
    ),
    react_1.default.createElement(
      elements_1.PaddedConfig,
      null,
      react_1.default.createElement(
        elements_1.ConfigItem,
        null,
        react_1.default.createElement(
          elements_1.PaddedPreference,
          Object.assign(
            {
              title: 'Hard Reload on Change',
              type: 'boolean',
            },
            bindValue(parsedFile, 'hardReloadOnChange')
          )
        )
      ),
      react_1.default.createElement(
        elements_1.ConfigDescription,
        null,
        'Force refresh the sandbox for a change. This is helpful for sandboxes with global state, like intervals.'
      )
    ),
    react_1.default.createElement(
      elements_1.PaddedConfig,
      null,
      react_1.default.createElement(
        elements_1.ConfigItem,
        null,
        react_1.default.createElement(
          elements_1.PaddedPreference,
          Object.assign(
            {
              title: 'Template',
              type: 'dropdown',
              options: templateOptions,
              mapName: (name) => templateNameMap[name],
            },
            bindValue(parsedFile, 'template', currentTemplate.name)
          )
        )
      ),
      react_1.default.createElement(
        elements_1.ConfigDescription,
        null,
        'Which template to use for this sandbox.'
      )
    ),
    !currentTemplate.isServer
      ? react_1.default.createElement(
          elements_1.PaddedConfig,
          null,
          react_1.default.createElement(
            elements_1.ConfigItem,
            null,
            react_1.default.createElement(
              elements_1.PaddedPreference,
              Object.assign(
                {
                  title: 'Disable Console',
                  type: 'boolean',
                },
                bindValue(parsedFile, 'disableLogging')
              )
            )
          ),
          react_1.default.createElement(
            elements_1.ConfigDescription,
            null,
            'Disable the in-browser console to prevent slowing down of the page when there are many logs to the console.'
          )
        )
      : null,
    currentTemplate.isServer
      ? react_1.default.createElement(
          react_1.default.Fragment,
          null,
          react_1.default.createElement(
            elements_1.PaddedConfig,
            null,
            react_1.default.createElement(
              elements_1.PaddedPreference,
              Object.assign(
                {
                  title: 'Port',
                  type: 'number',
                  innerStyle: {
                    width: '5rem',
                  },
                  min: 1024,
                  max: 65535,
                },
                bindValue(parsedFile, 'container.port')
              )
            ),
            react_1.default.createElement(
              elements_1.ConfigDescription,
              null,
              'What is the main port of your application. Values from 1024 to 65535'
            )
          ),
          react_1.default.createElement(
            elements_1.PaddedConfig,
            null,
            react_1.default.createElement(
              elements_1.PaddedPreference,
              Object.assign(
                {
                  title: 'Node Version',
                  type: 'dropdown',
                  options: ['10', '12', '14'],
                },
                bindValue(parsedFile, 'container.node')
              )
            ),
            react_1.default.createElement(
              elements_1.ConfigDescription,
              null,
              'Which node version to use for this sandbox. Please restart the server after changing.'
            )
          )
        )
      : null
  );
};
exports.default = {
  ConfigWizard: exports.ConfigWizard,
};
