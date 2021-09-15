(function (angular) { 'use strict';

  /**
   * Login controller.
   */

  angular.module('picjam.login', [])
  .controller('LoginCtrl', function ($window, $state) {
    var login = this;

    login.submit = function () {
      $window.localStorage.username = login.username;
      $state.go('game');
    };
  });

}(window.angular));
