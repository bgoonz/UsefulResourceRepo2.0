"use strict";

var request = require("superagent");
var GroupsActions = require("actions/groups_actions");
var DiscussionsActions = require("actions/discussions_actions");
var DiscussionEntriesActions = require("actions/discussion_entries_actions");
var GroupActions = require("actions/group_actions");
var SessionActions = require("actions/session_actions");

var FAKE_API_URL = __SETTINGS__.FAKE_API_URL;
var REAL_API_URL = "http://localhost:3000";

var ENDPOINTS = {
  signIn: FAKE_API_URL,
  // REAL_API_URL,
  access: FAKE_API_URL,
  // REAL_API_URL,
  fetchGroup: FAKE_API_URL,
  // REAL_API_URL + '/api/v1',
  fetchGroups: FAKE_API_URL,
  // REAL_API_URL + '/api/v1',
  createGroup: FAKE_API_URL,
  // REAL_API_URL + '/api/v1',
  createDiscussion: FAKE_API_URL,
  // REAL_API_URL + '/api/v1',
  fetchDiscussions: FAKE_API_URL,
  // REAL_API_URL + '/api/v1',
  fetchDiscussion: FAKE_API_URL,
  // REAL_API_URL + '/api/v1',
  createDiscussionEntry: FAKE_API_URL,
  // REAL_API_URL + '/api/v1',
  fetchDiscussionEntries: FAKE_API_URL,
  // REAL_API_URL + '/api/v1',
  fetchPerson: FAKE_API_URL,
};

var ApiHelper = {
  fetchGroups: function () {
    request
      .get(ENDPOINTS.fetchGroups + "/groups")
      .set("Authorization", sessionStorage.getItem("access_token"))
      .end(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          GroupsActions.fetch.completed(res.body);
        }
      });
  },

  fetchDiscussions: function (discutable_type, discutable_id) {
    request
      .get(ENDPOINTS.fetchDiscussions + "/discussions")
      .set("Authorization", sessionStorage.getItem("access_token"))
      .query({ discutable_type: discutable_type })
      .query({ discutable_id: discutable_id })
      .end(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          DiscussionsActions.fetch.completed(res.body);
        }
      });
  },

  createDiscussionEntry: function (params) {
    request
      .post(ENDPOINTS.createDiscussionEntry + "/discussion_entries/")
      .send(params)
      .set("Accept", "application/json")
      .set("Authorization", sessionStorage.getItem("access_token"))
      .end(function (err, res) {
        if (err) {
          DiscussionEntriesActions.create.failed(res.body);
        } else {
          DiscussionEntriesActions.create.completed(params.discussion_id);
        }
      });
  },

  fetchDiscussionEntries: function (discussion_id) {
    request
      .get(ENDPOINTS.fetchDiscussionEntries + "/discussion_entries")
      .set("Authorization", sessionStorage.getItem("access_token"))
      .query({ discussion_id: discussion_id })
      .end(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          DiscussionEntriesActions.fetch.completed(res.body);
        }
      });
  },

  fetchGroup: function (groupId) {
    request
      .get(ENDPOINTS.fetchGroup + "/groups/" + groupId)
      .set("Authorization", sessionStorage.getItem("access_token"))
      .end(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          GroupActions.fetch.completed(res.body);
        }
      });
  },

  createGroup: function (params) {
    request
      .post(ENDPOINTS.createGroup + "/groups/")
      .send(params)
      .set("Accept", "application/json")
      .set("Authorization", sessionStorage.getItem("access_token"))
      .end(function (err, res) {
        if (err) {
          GroupsActions.create.failed(res.body);
        } else {
          GroupsActions.create.completed();
        }
      });
  },

  fetchDiscussion: function (discussionId, caller) {
    request
      .get(ENDPOINTS.fetchDiscussion + "/discussions/" + discussionId)
      .set("Authorization", sessionStorage.getItem("access_token"))
      .end(
        function (err, res) {
          caller.discussion = res.body;
          caller.trigger(caller.discussion);
        }.bind(caller)
      );
  },

  createDiscussion: function (params) {
    request
      .post(ENDPOINTS.createDiscussion + "/discussions/")
      .send(params)
      .set("Accept", "application/json")
      .set("Authorization", sessionStorage.getItem("access_token"))
      .end(function (err, res) {
        if (err) {
          DiscussionsActions.create.failed(res.body);
        } else {
          DiscussionsActions.create.completed(res.body);
        }
      });
  },

  fetchPerson: function (personId, caller) {
    request
      .get(ENDPOINTS.fetchPerson + "/people/" + personId)
      .set("Authorization", sessionStorage.getItem("access_token"))
      .end(
        function (err, res) {
          caller.item = res.body;
          caller.trigger(caller.item);
        }.bind(caller)
      );
  },

  signIn: function (username, password) {
    request
      .post(ENDPOINTS.signIn + "/login/")
      .send({ username: username, password: password })
      .set("Accept", "application/json")
      .end(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          SessionActions.login.completed(res.body);
        }
      });
  },

  access: function () {
    request
      .post(ENDPOINTS.access + "/login/")
      .set("Authorization", sessionStorage.getItem("access_token"))
      .set("Accept", "application/json")
      .end(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          SessionActions.access.completed(res.body);
        }
      });
  },
};

module.exports = ApiHelper;
