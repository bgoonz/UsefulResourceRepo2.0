var Primus = require('primus');
var Emitter = require('primus-emitter');
var Rooms = require('primus-rooms');
var _ = require('lodash');
var primus;

/**
 * Attach server.
 *
 * @param {HttpServer} server
 */

exports.attach = function (server) {
  var users = require('../resources/users');
  var games = require('../resources/games');

  // Create and expose primus instance.
  primus = new Primus(server);

  // Enable emitter on primus instance.
  primus.use('emitter', Emitter);
  primus.use('rooms', Rooms);

  // Connection handler.
  primus.on('connection', function connected(spark) {

    // Create user.
    users.create({id: spark.id})
    .then(function (user) {
      // Self-update of the user.
      spark.on('me.update', function (data) {
        users.update(user.id, data);
      });

      // Emit a "game.join" event when a user join a game room.
      spark.on('joinroom', function (id) {
        games.find(id)
        .then(function (game) {
          var data = {game: game, user: user};
          console.log('JOIN', game);
          spark.send('game.join', _.extend(data, {me: true}));
          primus.room(id).except(spark.id).send('game.join', _.extend(data, {me: false}));
        });
      });

      // Emit a "game.leave" event when a user leave a game room.
      spark.on('leaveroom', function (room) {
        leaveGame(spark, room);
      });

      // Join game room.
      return games.addUser(user)
      .then(function (game) {
        // Chat.
        spark.on('chat', function (data) {
          if (data.text === 'magic start') return game.start();
          primus.room(game.id).send('chat', _.extend(data, {user: user}));
        });

        spark.on('question.answer', function (answer) {
          game.submitAnswer(user, answer)
          .then(function (valid) {
            spark.send('question.answer.ack', {valid: valid});
          });
        });
      });
    });
  });

  // Listen leaveallrooms event (called when a spark is disconnected).
  primus.on('leaveallrooms', function (rooms, spark) {
    rooms.forEach(function (room) {
      leaveGame(spark, room);
    });
  });

  /**
   * Make a spark leave a game.
   *
   * @param {Spark} spark
   * @param {string} id
   */

  function leaveGame(spark, id) {
    games.find(id)
    .then(function (game) {
      // Remove user from the game.
      game.removeUser({id: spark.id});
    });
  }

  // Disconnection handler.
  primus.on('disconnection', function disconnected(spark) {
    // Destroy user.
    users.destroy(spark.id);
  });
};

// Expose primus methods.
['send', 'join', 'room'].forEach(function (method) {
  exports[method] = function () {
    return primus[method].apply(primus, arguments);
  };
});
