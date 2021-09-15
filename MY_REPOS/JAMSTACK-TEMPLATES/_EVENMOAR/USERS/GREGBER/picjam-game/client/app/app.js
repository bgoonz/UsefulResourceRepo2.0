(function (angular) { 'use strict';

  /**
   * Main application.
   */

  angular.module('picjam', [
    'ui.router',
    'primus',
    'picjam.login',
    'picjam.game',
    'picjam.user'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, primusProvider) {
    // For any unmatched url, redirect to homepage
    $urlRouterProvider.otherwise('/');

    // Set up HTML5 mode.
    $locationProvider.html5Mode(true);

    // Define routes.
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: '/app/login/login.html',
        controller: 'LoginCtrl as login'
      })
      .state('game', {
        url: '/game',
        templateUrl: '/app/game/game.html',
        controller: 'GameCtrl as game'
      });

    // Configure primus.
    primusProvider.setEndpoint('/');
  });

}(window.angular));
