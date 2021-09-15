"use strict";

var React = require("react");
var RB = require("react-router-bootstrap");

var Reflux = require("reflux");
var DiscussionsStore = require("stores/discussions_store");
var DiscussionsActions = require("actions/discussions_actions");

var DiscussionsListContainer = React.createClass({
  displayName: "DiscussionsListContainer",

  mixins: [Reflux.connect(DiscussionsStore, "list")],

  componentDidMount: function () {
    var discutable_type = this.props.discutable_type;
    var discutable_id = this.props.discutable_id;
    DiscussionsActions.fetch(discutable_type, discutable_id);
  },

  render: function () {
    var discussions = this.state.list;
    var discutable_type = this.props.discutable_type;
    var discutable_id = this.props.discutable_id;

    if (discutable_type == "Group") {
      return (
        <DiscussionsList
          discussions={discussions}
          currentGroupId={discutable_id}
        />
      );
    }
  },
});

var DiscussionsList = React.createClass({
  render: function () {
    var discussions = this.props.discussions;
    var currentGroupId = this.props.currentGroupId;

    return (
      <ul className="nav nav-muted" data-ref="discussions-list">
        {discussions &&
          _.map(discussions, function (discussion, i) {
            var data_ref = "discussion_" + discussion.id;
            return (
              <RB.ListGroupItemLink
                data-ref={data_ref}
                to="discussion"
                key={i}
                params={{
                  discussionId: discussion.id,
                  groupId: currentGroupId,
                }}
              >
                {discussion.title}
              </RB.ListGroupItemLink>
            );
          })}
      </ul>
    );
  },
});

module.exports = DiscussionsListContainer;
