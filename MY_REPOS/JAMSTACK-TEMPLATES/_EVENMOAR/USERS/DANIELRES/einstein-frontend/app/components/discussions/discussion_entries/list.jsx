"use strict";

var React = require("react");
var Reflux = require("reflux");
var B = require("react-bootstrap");

var DiscussionEntriesStore = require("stores/discussion_entries_store");
var DiscussionEntriesActions = require("actions/discussion_entries_actions");

var PersonAvatar = require("components/person_avatar");
var Meta = require("components/meta");

var DiscussionEntriesListContainer = React.createClass({
  displayName: "DiscussionEntriesListContainer",

  mixins: [Reflux.connect(DiscussionEntriesStore, "list")],

  componentDidMount: function () {
    DiscussionEntriesActions.fetch(this.props.discussionId);
  },

  render: function () {
    return <DiscussionEntriesList discussionEntries={this.state.list} />;
  },
});

var DiscussionEntriesList = React.createClass({
  displayName: "DiscussionEntriesList",

  render: function () {
    var discussionEntries = this.props.discussionEntries;

    return (
      <div data-ref="discussions-entries-list">
        {discussionEntries &&
          discussionEntries.map(function (entry, i) {
            return (
              <Entry
                entry={entry}
                follow={true}
                key={i}
                reply={true}
                repost={true}
              />
            );
          })}
      </div>
    );
  },
});

var Entry = React.createClass({
  displayName: "Entry",

  render: function () {
    var entry = this.props.entry;
    var author = entry.author;
    var data_ref = "discussion_entry_" + entry.id;

    return (
      <div data-ref={data_ref}>
        <hr />
        <B.Row>
          <B.Col md={1}>
            <PersonAvatar person={author} size={40} />
          </B.Col>
          <B.Col md={10}>
            {entry.body}
            <Meta
              follow={this.props.follow}
              reply={this.props.reply}
              repost={this.props.repost}
            />
          </B.Col>
        </B.Row>
      </div>
    );
  },
});

module.exports = DiscussionEntriesListContainer;
