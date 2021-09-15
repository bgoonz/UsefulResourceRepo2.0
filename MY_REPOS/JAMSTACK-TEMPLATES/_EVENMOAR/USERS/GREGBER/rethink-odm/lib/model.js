/**
 * Module dependencies.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Promise = require('bluebird');

/**
 * Expose module.
 */

exports.create = createModel;

/**
 * Create a new model.
 *
 * @param {Client} client
 * @param {object} options
 * @param {string} options.tableName
 * @returns {Model}
 */

function createModel(client, options) {

  options = _.defaults(options, {
    hooks: {}
  });

  /**
   * Privates properties.
   */

  var table = client.r.table(options.tableName);

  /**
   * Create a new instance of Model.
   *
   * @param {object} data
   */

  function Model(data) {
    var model = this;
    EventEmitter.call(model);

    // Extend model with data.
    _.extend(model, data);

    // Apply hooks.
    _.each(options.hooks, function (listener, event) {
      model.on(event, listener.bind(model));
    });
  }

  util.inherits(Model, EventEmitter);

  /**
   * Return the table associated to the model.
   *
   * @returns {TermBase}
   */

  Model.table = function () {
    return table;
  };

  /**
   * Insert the document.
   *
   * @param {function} cb
   */

  Model.prototype.insert = function (cb) {
    var model = this;

    return Promise.resolve()
    .then(function () {
      model.emit('insert', model);
      return client.run(table.insert(model.toJSON()));
    })
    .then(function (res) {
      // Handle database errors.
      if (res.first_error) throw new Error(res.first_error);

      // Update id on the local model instance.
      if (res.generated_keys) model.id = res.generated_keys[0];

      model.emit('inserted', model);
      return model;
    })
    .nodeify(cb);
  };

  /**
   * Update the document.
   *
   * @param {object} [data]
   * @param {function} cb
   */

  Model.prototype.update = function (data, cb) {
    var model = this;

    // update(cb)
    if (_.isFunction(data)) {
      cb = data;
      data = null;
    }

    // If data are not provided, we use the entire model.
    data = data || model.toJSON();

    return Promise.resolve()
    .then(function () {
      model.emit('update', model, data);
    })
    .then(function () {
      return client.run(table.get(model.id).update(data));
    })
    .then(function (res) {
      // Handle not found error.
      if (res.skipped) throw new Error('Not found');

      // Handle database errors.
      if (res.first_error) throw new Error(res.first_error);

      // Extend model with updated data.
      _.extend(model, data);

      model.emit('updated', model, data);
      return model;
    })
    .nodeify(cb);
  };

  /**
   * Delete the document.
   *
   * @param {function} cb
   */

  Model.prototype.delete = function (cb) {
    var model = this;

    return Promise.resolve()
    .then(function () {
      model.emit('delete', model);
    })
    .then(function () {
      return client.run(table.get(model.id).delete());
    })
    .then(function (res) {
      // Handle database errors.
      if (res.first_error) throw new Error(res.first_error);

      model.emit('deleted', model);
    })
    .nodeify(cb);
  };

  /**
   * Return the properties of the model.
   *
   * @returns {object}
   */

  Model.prototype.toJSON = function () {
    var properties = _.difference(
      Object.getOwnPropertyNames(this),
      Object.getOwnPropertyNames(new EventEmitter())
    );
    return _.pick(this, properties);
  };

  return Model;
}