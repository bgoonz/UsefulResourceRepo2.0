"use strict";

var Reflux = require("reflux");
var DiscussionsActions = require("actions/discussions_actions");
var GroupActions = require("actions/group_actions");

var ApiHelper = require("helpers/api_helper");

module.exports = Reflux.createStore({
  listenables: [DiscussionsActions],

  getInitialState: function () {
    return [];
  },

  onFetch: function (discutable_type, discutable_id) {
    ApiHelper.fetchDiscussions(discutable_type, discutable_id);
  },

  onFetchCompleted: function (result) {
    this.trigger(result.reverse());
  },

  onCreate: function (params) {
    ApiHelper.createDiscussion(params);
  },

  onCreateCompleted: function (result) {
    DiscussionsActions.fetch(result.discutable_type, result.discutable_id);
  },
});
