"use strict";

var React = require("react");
var Reflux = require("reflux");

var B = require("react-bootstrap");

var DiscussionEntriesActions = require("actions/discussion_entries_actions");
var FormErrorsComponent = require("components/shared/form").Errors;

var DiscussionEntryForm = React.createClass({
  displayName: "DiscussionEntryForm",

  getInitialState: function () {
    return {
      errors: {},
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var params = {
      body: this.refs.body.getValue(),
      discussion_id: this.props.discussionId,
    };
    DiscussionEntriesActions.create(params);

    this.handleSubmitResult();
  },

  handleSubmitResult: function () {
    this.refs.addingADiscussionEntryForm.getDOMNode().reset();
  },

  render: function () {
    return (
      <div>
        <form
          className="form-horizontal"
          onSubmit={this.handleSubmit}
          ref="addingADiscussionEntryForm"
        >
          <FormErrorsComponent errors={this.state.errors} />
          <B.Input
            data-ref="adding-a-discussion-entry-input-body"
            label=""
            labelClassName="col-xs-4"
            ref="body"
            type="text"
            wrapperClassName="col-xs-7"
          />
          <B.Button type="submit">Submit</B.Button>
        </form>
      </div>
    );
  },
});

module.exports = DiscussionEntryForm;
