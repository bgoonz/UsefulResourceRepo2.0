var _ = require('lodash');
var uuid = require('node-uuid');
var Promise = require('bluebird');
var config = require('../config');
var io = require('../io');
var Question = require('./question');
var logger = require('../logger');
var flickr = require('../services/flickr');

/**
 * Create a new game.
 */

var Game = module.exports = function (data) {
  _.defaults(this, data, {
    id: uuid.v4(),
    users: [],
    status: 'waiting',
    nbUsers: config.game.nbUsers,
    nbQuestions: config.game.nbQuestions,
    questions: [],
    scores: {},
    currentQuestion: null
  });
};

/**
 * Determine if a game is available.
 *
 * @returns {boolean}
 */

Game.prototype.isAvailable = function () {
  return this.status === 'waiting' && this.users.length < config.game.nbUsers;
};

/**
 * Add user.
 *
 * @param {User} user
 */

Game.prototype.addUser = function (user) {
  // Add user.
  this.users.push(user);

  // Add score.
  this.scores[user.id] = 0;

  logger.log('Add user "%s" to game "%s"', user.id, this.id);

  // Try to start game.
  if (this.users.length === config.game.nbUsers)
    this.start();
};

/**
 * Remove user.
 *
 * @param {User} user
 */

Game.prototype.removeUser = function (user) {
  // Remove the user if we are in waiting mode.
  if (this.status === 'waiting') _.remove(this.users, {id: user.id});

  // Log.
  logger.log('Remove user from game', user, this);

  // Broadcast event.
  this.broadcast('game.leave', {game: this, user: {id: user.id}});
};

/**
 * Brodcast event.
 *
 * @param {string} event
 * @param {object} message
 */

Game.prototype.broadcast = function (event, message) {
  io.room(this.id).send(event, message);
};

/**
 * Start the game.
 */

Game.prototype.start = function () {
  // If game is already started, do nothing.
  if (this.status === 'started') return ;

  // Set the status to "started".
  this.status = 'started';

  // Broadcast the start.
  this.broadcast('game.start', {time: config.game.timeBeforeStart});

  logger.log('Game started', this.toJSON());

  // Plan the first question.
  setTimeout(_.bind(this.startQuestion, this), config.game.timeBeforeStart);
};

/**
 * Start a question.
 */

Game.prototype.startQuestion = function () {
  var game = this;
  var keywords = _.sample(config.questions);

  flickr.search(keywords.join(','))
  .then(function (url) {
    // Create question.
    game.currentQuestion = new Question({
      number: game.questions.length + 1,
      imageUrl: url,
      answers: keywords,
      answer: keywords[0]
    });

    // Add questions to the game.
    game.questions.push(game.currentQuestion);

    // Broadcast "question.start".
    game.broadcast('question.start', _.omit(game.currentQuestion.toJSON(), 'answer'));

    logger.log('Start question', game.currentQuestion.toJSON());

    // Plan the end of question.
    setTimeout(_.bind(game.endQuestion, game), config.game.questionTime);
  });
};

/**
 * End the current question.
 */

Game.prototype.endQuestion = function () {
  // Broadcast "question.end".
  this.broadcast('question.end', {
    question: this.currentQuestion,
    time: config.game.timeBetweenQuestions,
    scores: this.scores
  });

  // Set currentQuestion to null.
  this.currentQuestion = null;

  logger.log('End question');

  // If the game if finish, end it.
  if (this.questions.length === config.game.nbQuestions)
    return this.end();

  // Else plan the next question.
  setTimeout(_.bind(this.startQuestion, this), config.game.timeBetweenQuestions);
};

/**
 * End the game.
 */

Game.prototype.end = function () {
  // Set the status to "finished".
  this.status = 'finished';

  // Broadcast the start.
  this.broadcast('game.end', {
    scores: this.scores
  });

  logger.log('End game');
};

/**
 * Submit an answer for the current question.
 *
 * @param {User} user
 * @param {object} answer
 * @returns {Promise}
 */

Game.prototype.submitAnswer = function (user, answer) {
  if (!this.currentQuestion) return Promise.resolve(false);

  var valid = this.currentQuestion.valid(answer, user);

  logger.log('Answer received', answer, user);
  logger.log('Answer valid', valid);

  if (valid) {
    // Compute points.
    var points = config.game.points[this.currentQuestion.winners.length - 1];

    if (points) {
      // Brocast "question.winner".
      this.broadcast('question.winner', {
        question: this.currentQuestion,
        user: user,
        rank: this.currentQuestion.winners.length,
        points: points
      });

      // Update score.
      this.scores[user.id] += points;

      logger.log('Send winner "%s", with points %d', user.id, points);
    }
  }

  return Promise.resolve(valid);
};

/**
 * JSON serialization.
 *
 * @returns {object}
 */

Game.prototype.toJSON = function () {
  return _.pick(this, 'id', 'users', 'nbUsers', 'nbQuestions');
};
