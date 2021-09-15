require.config({
  baseUrl: '/assets/js',
  paths: {
    'tpl'         : '../tpl',
    'bootstrap'   : '../components/bootstrap/js',

    'backbone'    : '../components/backbone/backbone',
    'jquery'      : '../components/jquery/jquery',
    'lodash'      : '../components/lodash/dist/lodash.underscore',
    'text'        : '../components/requirejs-text/text',
    'handlebars'  : '../components/handlebars/handlebars'
  },
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
    },
    'bootstrap/bootstrap-transition': {
      deps: [
        'jquery'
      ]
    },
    'bootstrap/bootstrap-collapse': {
      deps: [
        'jquery'
      ]
    },
    'bootstrap/bootstrap-dropdown': {
      deps: [
        'jquery',
        'bootstrap/bootstrap-transition',
        'bootstrap/bootstrap-collapse'
      ]
    },
    'app': {
      deps: [
        'backbone',
        'handlebars',
        'bootstrap/bootstrap-dropdown'
      ]
    }
  },
  deps: [
    'app'
  ]
});