// Create sub-modules.
window.notepad = {
  constants: angular.module('notepad.constants', []),
  services: angular.module('notepad.services', []),
  controllers: angular.module('notepad.controllers', []),
  filters: angular.module('notepad.filters', []),
  directives: angular.module('notepad.directives', [])
};

// Create main module.
window.notepad.app = angular.module('notepad', [
  'ui.router',
  'ngResource',
  'pascalprecht.translate',
  'notepad.constants',
  'notepad.services',
  'notepad.controllers',
  'notepad.filters',
  'notepad.directives'
])
.config(function ($locationProvider, $stateProvider, $urlRouterProvider, $translateProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('notes', {
    url: '/notes',
    templateUrl: '/views/routes/notes.html',
    controller: 'NotesCtrl'
  })
  .state('notes.detail', {
    url: '/:id',
    templateUrl: '/views/routes/notes/detail.html',
    controller: 'NotesDetailCtrl'
  })
  .state('about', {
    url: '/about',
    template: 'Notepad application for Workshop.'
  });

  $urlRouterProvider.otherwise('/notes');

  $translateProvider.useStaticFilesLoader({
    prefix: '/translations/locale-',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
})
.run(function ($location, $rootScope, $translate, theme) {
  if($location.path() === '/error') {
    $location
    .path('/')
    .replace();
  }

  $rootScope.theme = theme;
  $rootScope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
});