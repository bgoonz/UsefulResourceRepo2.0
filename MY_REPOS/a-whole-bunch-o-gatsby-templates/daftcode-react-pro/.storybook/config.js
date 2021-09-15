import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { getTheme } from './decorators/theme';
import './../src/injectGlobal';

setOptions({
  name: 'React-Pro',
  url: '#',
  addonPanelInRight: true,
  sortStoriesByKind: true,
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
});

addDecorator(getTheme())

const req = require.context('../src', true, /.stories.js$/);
// const req = require.context("../src/products/linguotica/landings/ldc/register/sections/msisdn", true, /.stories.js$/);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
