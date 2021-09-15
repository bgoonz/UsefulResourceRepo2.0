require.config({
  baseUrl: '/assets',
  paths: {
    'backbone'    : 'components/backbone/backbone',
    'jquery'      : 'components/jquery/jquery',
    'lodash'      : 'components/lodash/dist/lodash.underscore',
    'text'        : 'components/requirejs-text/text',
    'handlebars'  : 'components/handlebars/handlebars'
  },
  packages: [
    {
      name: 'components',
      location: '../components'
    }
  ],
  shim: {
    'backbone': {
      deps: [
        'lodash',
        'jquery'
      ],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'lodash': {
      exports: '_'
    }
  },
  deps: [
    'backbone',
    'handlebars'
  ],
  callback: function () {
    require(['js/app']);
  }
});