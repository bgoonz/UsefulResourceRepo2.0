(function (angular, _) { 'use strict';

  /**
   * Chat directive.
   */

  angular.module('picjam.game.chat', ['primus'])
  .directive('pjChat', function ($timeout) {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: '/app/game/chat/chat.html',
      link: function (scope, element) {
        scope.$watchCollection('messages', function () {
          $timeout(function () {
            var messages = element.find('ul')[0];
            messages.scrollTop = messages.scrollHeight;
          });
        });
      },
      controllerAs: 'chat',
      controller: function ($scope, primus) {
        // Messages.
        $scope.messages = [];

        if($scope.game.status === 'waiting'){
          $scope.placeholder = 'When the game starts, type your answer here';
        }

        primus.$on('game.join', function (obj) {
          $scope.messages.push({text: obj.user.username + ' joined game', type: 'info'});
        });

        primus.$on('game.leave', function (obj) {
          var user = _.find(obj.game.users, {id: obj.user.id});
          $scope.messages.push({text: user.username + ' left game', type: 'info'});
        });

        primus.$on('game.end', function () {
          $scope.messages.push({text: 'The game is finished!', type: 'info'});
          var sortedUsers = _.sortBy($scope.game.users, function (user) {
            return -user.score;
          });
          _.each(sortedUsers, function (user, index) {
            if (index > 2) return;
            $scope.messages.push({text: user.username + ' with ' + user.score + ' points!', rank: index + 1, type: 'rank'});
          });
        });

        primus.$on('chat', function (obj) {
          var message = _.extend({
            type: obj.user.id === $scope.game.me.id ? 'chat-me' : 'chat'
          }, obj);
          $scope.messages.push(message);
        });

        primus.$on('question.start', function(obj){
          $scope.placeholder = 'Type your answer here';

          if (obj.number === $scope.game.nbQuestions) {
            $scope.messages.push({
              text: 'Be careful, last question!',
              type: 'info'
            });
          } else if (obj.number === $scope.game.nbQuestions - 1) {
            $scope.messages.push({
              text: 'Be careful, two questions left!',
              type: 'info'
            });
          } else if (obj.number === $scope.game.nbQuestions - 2) {
            $scope.messages.push({
              text: 'Be careful, three questions left!',
              type: 'info'
            });
          }

          $scope.messages.push({
            text: 'Guess number #' + obj.number,
            type: 'question'
          });
        });

        primus.$on('question.end', function () {
          $scope.placeholder = 'Type your message here';
          $scope.messages.push({type: 'interlude'});
        });

        primus.$on('question.winner', function(obj){
          var message = _.extend({
            type: obj.user.id === $scope.game.me.id ? 'win-me' : 'win'
          }, obj);
          $scope.messages.push(message);
        });

        primus.$on('question.answer.ack', function(obj){
          var text = obj.valid ? 'Correct ! Bazinga !!!' : 'Nope, try again !';
          $scope.messages.push({
            text: text,
            type: 'info'
          });
        });

        this.submit = function () {
          if (!$scope.text) return ;

          if($scope.game && $scope.game.me){
           if ($scope.game.currentQuestion){
              primus.send('question.answer', {text: $scope.text});
              var message = _.extend({
                text: $scope.text,
                type: 'answer'
              });
              $scope.messages.push(message);
             } else{
              primus.send('chat', {text: $scope.text});
             }

            $scope.text = '';
          }
        };
      }
    };
  });

}(window.angular, window._));
