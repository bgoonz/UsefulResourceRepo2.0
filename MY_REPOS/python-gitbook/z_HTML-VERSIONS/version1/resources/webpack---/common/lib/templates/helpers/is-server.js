'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.isServer = void 0;
const SERVER_TEMPLATE_NAMES = [
  'adonis',
  'apollo',
  'ember',
  'gatsby',
  'gridsome',
  'marko',
  'mdx-deck',
  'nest',
  'next',
  'node',
  'nuxt',
  'quasar',
  'sapper',
  'styleguidist',
  'unibit',
  'vuepress',
  'docusaurus',
];
exports.isServer = (template) => SERVER_TEMPLATE_NAMES.indexOf(template) !== -1;
