(function (angular, _) { 'use strict';

  /**
   * Game controller.
   */

  angular.module('picjam.game', [
    'picjam.game.leaderboard',
    'picjam.game.countdown',
    'picjam.game.tips',
    'picjam.game.chat',
    'picjam.game.question'
  ])
  .controller('GameCtrl', function (primus, User, $window, $state) {
    var game = this;

    // Return to login if there is no username.
    if (!$window.localStorage.username) return $state.go('login');

    // Id.
    game.id = null;

    // Me.
    game.me = null;

    // Users.
    game.users = null;

    // Status.
    game.status = 'waiting';

    // Timer.
    game.timer = null;

    // Previous question.
    game.previousQuestion = null;

    // Current question.
    game.currentQuestion = null;

    // Restart game.
    game.restart = function () {
      $window.location.reload();
    };

    // Initialize game.
    primus.$on('game.join', function (msg) {
      _.extend(game, _.pick(msg.game, 'id', 'nbUsers', 'nbQuestions'));

      // Initialize users.
      game.users = game.users || _.map(msg.game.users, function (user) {
        return new User(user);
      });

      var user = new User(msg.user);

      // Set ourself.
      if (msg.me) {
        game.me = user;
        user.me = true;

        // Update username.
        primus.send('me.update', {username: $window.localStorage.username});
      }

      // Add user if it doesn't already exist.
      if (!_.find(game.users, {id: msg.user.id}))
        game.users.push(user);
    });

    // Remove leaving user.
    primus.$on('game.leave', function (msg) {
      // If game is in "waiting" mode, remove the user.
      if (game.status === 'waiting')
        _.remove(game.users, {id: msg.user.id});

      // Set user offline.
      var user = _.find(game.users, {id: msg.user.id});

      // If user is not found, ignore it.
      if (!user) return;

      // Update user.
      user.online = false;
    });

    // Start game.
    primus.$on('game.start', function (msg) {
      // Set status to "starting".
      game.status = 'starting';

      // Update timer.
      game.timer = msg.time - 1000;
    });

    // End the game.
    primus.$on('game.end', function () {
      // Set status to finished.
      game.status = 'finished';
    });

    // Set current question.
    primus.$on('question.start', function (msg) {
      // Set status to "question".
      game.status = 'question';

      // Set previous and current question.
      game.previousQuestion = null;
      game.currentQuestion = msg;

      // Update timer.
      game.timer = msg.time - 1000;
    });

    // Remove current question.
    primus.$on('question.end', function (msg) {
      // Set status to "question".
      game.status = 'pause';

      // Set previous and current question.
      game.previousQuestion = msg.question;
      game.currentQuestion = null;

      // Update timer.
      game.timer = msg.time - 1000;
    });

    // Set up winner.
    primus.$on('question.winner', function (obj) {
      var user = _.find(game.users, {id: obj.user.id});

      if (!user) return;

      // Add points.
      user.score += obj.points;
    });

    // Update user.
    primus.$on('users.update', function (msg) {
      var user = _.find(game.users, {id: msg.id});

      if (!user) return ;

      _.extend(user, msg);
    });
  });

}(window.angular, window._));
