(function (angular) { 'use strict';

  /**
   * Advert directive.
   */

  angular.module('picjam.game.tips', ['primus'])
  .directive('pjTips', function () {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: '/app/game/tips/tips.html'
    };
  });

}(window.angular));
