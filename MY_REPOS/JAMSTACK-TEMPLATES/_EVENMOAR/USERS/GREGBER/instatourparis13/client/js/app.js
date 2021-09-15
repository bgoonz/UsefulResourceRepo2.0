(function () {

  angular.module('itp13', [
    'ui.router',
    'angulartics',
    'angulartics.google.analytics',
    'itp13.grid',
    'itp13.detail'
  ])
  .config(['$locationProvider', '$urlRouterProvider', '$stateProvider', '$analyticsProvider', configure])
  .run(['$rootScope', '$analytics', '$location', function ($rootScope, $analytics, $location) {
    $analytics.pageTrack($location.url());
    $rootScope.$on('$stateChangeSuccess', $analytics.pageTrack.bind($analytics, $location.url()));
  }]);

  function configure($locationProvider, $urlRouterProvider, $stateProvider, $analyticsProvider) {
    $analyticsProvider.virtualPageviews(false);
    $analyticsProvider.firstPageview(false);
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/', '/photos');
    $stateProvider
      .state('photos', {
        abstract: true,
        url: '/photos',
        templateUrl: '/views/photos/index.html'
      })
      .state('photos.grid', {
        url: '{path:/?}?p',
        templateUrl: '/views/photos/grid.html',
        controller: 'GridCtrl'
      })
      .state('photos.detail', {
        url: '/:id',
        templateUrl: '/views/photos/detail.html',
        controller: 'DetailCtrl'
      });
  }

})();