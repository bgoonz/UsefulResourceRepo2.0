module.exports = function (config) {
  config.set({
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-ng-html2js-preprocessor'
    ],
    frameworks: ['mocha'],
    browsers: ['Chrome'],
    preprocessors: {
      'client/views/**/*.html': ['ng-html2js']
    },
    files: [
      {pattern: 'bower_components/jquery/dist/jquery.js', watched: false},
      {pattern: 'bower_components/bootstrap/dist/js/bootstrap.js', watched: false},
      {pattern: 'bower_components/angular/angular.js', watched: false},
      {pattern: 'bower_components/angular-ui-router/release/angular-ui-router.js', watched: false},
      {pattern: 'bower_components/angular-resource/angular-resource.js', watched: false},
      {pattern: 'bower_components/angular-translate/angular-translate.js', watched: false},
      {pattern: 'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js', watched: false},

      {pattern: 'bower_components/angular-mocks/angular-mocks.js', watched: false},
      {pattern: 'node_modules/chai/chai.js', watched: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', watched: false},
      {pattern: 'node_modules/sinon-chai/lib/sinon-chai.js', watched: false},

      'client/app.js',
      'client/app/**/*.js',
      'client/views/**/*.html',
      'test/client/**/*.js',
      'test/mocks/**/*.js'
    ],
    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/',
      prependPrefix: '/'
    }
  });
};