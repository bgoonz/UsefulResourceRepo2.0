(function (angular) { 'use strict';

  /**
   * Advert directive.
   */

  angular.module('picjam.game.question', [])
  .directive('pjQuestion', function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        question: '=',
        timer: '=',
        game: '='
      },
      templateUrl: '/app/game/question/question.html',
      controllerAs: 'question',
      link: function (scope, element) {
        var img = element.find('img');

        scope.$watch('question', function (question) {
          if (!question || question.answer) {
            img.removeClass('blur');
            img.css('transition', 'none');
            return ;
          }

          img.addClass('blur');

          // Wait render.
          $timeout(function () {
            img.css('transition', 'all ' + question.time + 'ms ease-out');
            img.removeClass('blur');
          });
        });
      }
    };
  });

}(window.angular));
