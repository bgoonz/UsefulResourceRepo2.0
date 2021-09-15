"use strict";

var Reflux = require("reflux");

var DiscussionEntriesActions = require("actions/discussion_entries_actions");
var ApiHelper = require("helpers/api_helper");

module.exports = Reflux.createStore({
  listenables: [DiscussionEntriesActions],

  getInitialState: function () {
    return [];
  },

  onFetch: function (discussionId) {
    ApiHelper.fetchDiscussionEntries(discussionId, this);
  },

  onFetchCompleted: function (result) {
    this.trigger(result.reverse());
  },

  onCreate: function (params) {
    ApiHelper.createDiscussionEntry(params);
  },

  onCreateCompleted: function (discussionId) {
    this.onFetch(discussionId);
  },
});
