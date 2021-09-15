var Promise = require('bluebird');
var _ = require('lodash');
var logger = require('../logger');
var Game = require('../models/game');
var io = require('../io');
var games = {};

/**
 * Find a game room.
 *
 * @param {string} id
 * @returns {Promise}
 */

exports.find = function (id) {
  var game = games[id];
  if (!game) return Promise.reject(new Error('Game not found'));
  return Promise.resolve(game);
};

/**
 * Add user to a game.
 *
 * @param {object} user
 *
 * @returns {Promise}
 */

exports.addUser = function (user) {
  return new Promise(function (resolve, reject) {
    // Get avalaible game.
    var game = getAvailableGame();

    // Join the io game.
    io.join([user.id], game.id, function (err) {
      if (err) return reject(err);

      // Add user in the game.
      game.addUser(user);

      resolve(game);
    });
  });
};

/**
 * Return a game avalaible.
 *
 * @returns {object}
 */

function getAvailableGame() {
  var game = _.find(games, function (game) {
    return game.isAvailable();
  });

  // If there is no game, create one.
  if (!game) {
    logger.log('No available game, will create one');
    return create();
  }

  return game;
}

/**
 * Create a new game.
 *
 * @returns {object}
 */

function create() {
  // Create game.
  var game = new Game();

  // Add game to the game list.
  games[game.id] = game;

  logger.log('Create a new game', game);

  return game;
}
