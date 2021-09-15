"use strict";

var React = require("react");
var B = require("react-bootstrap");
var _ = require("lodash");

var GroupsActions = require("actions/groups_actions");

var FormErrorsComponent = require("components/shared/form").Errors;

var GroupsMenu = React.createClass({
  displayName: "GroupsMenu",

  render: function () {
    return (
      <div style={{ textAlign: "right", marginBottom: "20" }}>
        <CreateGroupModal />
        &nbsp; &nbsp;
        <FindGroupModal />
      </div>
    );
  },
});

var FindGroupModal = React.createClass({
  displayName: "FindGroupModal",

  getInitialState: function () {
    return { showModal: false };
  },

  close: function () {
    this.setState({ showModal: false });
  },

  open: function () {
    this.setState({ showModal: true });
  },

  render: function () {
    return (
      <span>
        <B.Button onClick={this.open}>
          <B.Glyphicon glyph="search" />
        </B.Button>

        <B.Modal onHide={this.close} show={this.state.showModal}>
          <B.Modal.Header closeButton onHide={this.close}>
            <B.Modal.Title>Find groups</B.Modal.Title>
          </B.Modal.Header>
          <B.Modal.Body>
            <B.Input
              addonAfter={<B.Glyphicon glyph="search" />}
              placeholder="Find a group"
              type="text"
            />
          </B.Modal.Body>
          <B.Modal.Footer></B.Modal.Footer>
        </B.Modal>
      </span>
    );
  },
});

var CreateGroupModal = React.createClass({
  displayName: "CreateGroupModal",

  getInitialState: function () {
    return {
      errors: {},
      showModal: false,
    };
  },

  close: function () {
    this.setState({ showModal: false });
  },

  open: function () {
    this.setState({ showModal: true });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var params = {
      name: this.refs.name.getValue(),
      description: this.refs.description.getValue(),
    };
    GroupsActions.create(params);
    this.handleSubmitResult();
  },

  handleSubmitResult: function () {
    var that = this;
    GroupsActions.create.completed.listen(function () {
      that.close();
    });

    GroupsActions.create.failed
      .listen(function (errors) {
        that.setState({ errors: errors });
      })
      .bind(this);
  },

  render: function () {
    return (
      <span>
        <B.Button data-ref="adding-a-group-button" onClick={this.open}>
          <B.Glyphicon glyph="plus" />
        </B.Button>

        <B.Modal onHide={this.close} show={this.state.showModal}>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <B.Modal.Header closeButton onHide={this.close}>
              <B.Modal.Title>Create a group</B.Modal.Title>
            </B.Modal.Header>
            <B.Modal.Body>
              <FormErrorsComponent errors={this.state.errors} />
              <B.Input
                data-ref="adding-a-group-input-name"
                label="Name of the group"
                labelClassName="col-xs-4"
                ref="name"
                type="text"
                wrapperClassName="col-xs-7"
              />
              <B.Input
                label="Description"
                data-ref="adding-a-group-input-description"
                labelClassName="col-xs-4"
                ref="description"
                type="text"
                wrapperClassName="col-xs-7"
              />
            </B.Modal.Body>
            <B.Modal.Footer>
              <B.Button type="submit">Submit</B.Button>
            </B.Modal.Footer>
          </form>
        </B.Modal>
      </span>
    );
  },
});

module.exports = GroupsMenu;
