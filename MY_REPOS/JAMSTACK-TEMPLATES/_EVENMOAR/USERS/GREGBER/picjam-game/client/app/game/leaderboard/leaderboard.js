(function (angular) { 'use strict';

  /**
   * Main application.
   */

  angular.module('picjam.game.leaderboard', [])
  .directive('pjLeaderboard', function () {
    return {
      restrict: 'E',
      scope: {
        users: '='
      },
      templateUrl: '/app/game/leaderboard/leaderboard.html'
    };
  });

}(window.angular));
