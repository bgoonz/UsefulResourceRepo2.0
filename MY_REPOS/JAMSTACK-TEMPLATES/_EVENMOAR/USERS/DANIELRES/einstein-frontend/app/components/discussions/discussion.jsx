"use strict";

var React = require("react");
var Reflux = require("reflux");

var B = require("react-bootstrap");

var DiscussionActions = require("actions/discussion_actions");
var DiscussionStore = require("stores/discussion_store");

var DiscussionEntriesList = require("components/discussions/discussion_entries/list");
var DiscussionEntryForm = require("./discussion_entries/form");

var PersonAvatar = require("components/person_avatar");
var Meta = require("components/meta");

var DiscussionLoader = React.createClass({
  displayName: "DiscussionLoader",

  contextTypes: { router: React.PropTypes.func },
  mixins: [Reflux.connect(DiscussionStore, "discussion")],

  componentWillReceiveProps: function () {
    var discussionId = this.context.router.getCurrentParams().discussionId;
    DiscussionActions.load(discussionId);
  },

  render: function () {
    var discussionId = this.context.router.getCurrentParams().discussionId;
    return discussionId ? (
      <Discussion discussion={this.state.discussion} />
    ) : (
      this.props.ifEmpty
    );
  },
});

var Discussion = React.createClass({
  displayName: "Discussion",

  render: function () {
    var discussion = this.props.discussion;
    var discussionId = discussion.id;

    return (
      <div>
        <div className="text-right">
          <Meta follow={true} />
        </div>

        <DiscussionEntryForm discussionId={discussionId} />

        <DiscussionEntriesList discussionId={discussionId} key={discussionId} />
      </div>
    );
  },
});

module.exports = DiscussionLoader;
