"use strict";

var React = require("react");
var Reflux = require("reflux");

var PersonActions = require("actions/person_actions");
var PersonStore = require("stores/person_store");

var Meta = require("components/meta");

var B = require("react-bootstrap");

var Person = React.createClass({
  displayName: "Person",
  contextTypes: { router: React.PropTypes.func },
  mixins: [Reflux.connect(PersonStore, "item")],

  componentDidMount: function () {
    var personId =
      this.props.id || this.context.router.getCurrentParams().personId;
    PersonActions.load(personId);
  },
  render: function () {
    var p = this.state.item;
    var menu = this.props.is_current_user ? (
      <CurrentUserMenu />
    ) : (
      <OtherUserMenu />
    );

    return (
      <div>
        <B.Row>
          <B.Col md={3}>
            <p className="text-center">
              <img
                alt={p.username + " avatar"}
                className="img-circle"
                src={p.avatar}
                title={p.username}
              />
            </p>
            <br />
            {menu}
          </B.Col>
          <B.Col md={9}>
            <B.PageHeader>{p.username}</B.PageHeader>
            {[1, 2, 3, 4, 5].map(function () {
              return <Publication />;
            })}
          </B.Col>
        </B.Row>
      </div>
    );
  },
});

var CurrentUserMenu = React.createClass({
  displayName: "CurrentUserMenu",

  render: function () {
    return (
      <B.ListGroup>
        <B.ListGroupItem href="#">
          <B.Glyphicon glyph="edit" /> Edit
        </B.ListGroupItem>
      </B.ListGroup>
    );
  },
});

var OtherUserMenu = React.createClass({
  displayName: "OtherUserMenu",

  render: function () {
    return (
      <B.ListGroup>
        <B.ListGroupItem href="#">
          <B.Glyphicon glyph="star-empty" /> Follow
        </B.ListGroupItem>
        <B.ListGroupItem href="#">
          <B.Glyphicon glyph="comment" /> Private message
        </B.ListGroupItem>
      </B.ListGroup>
    );
  },
});

var Publication = React.createClass({
  displayName: "Publication",

  render: function () {
    var content = "Lorem Ipsum";
    return (
      <div>
        {content}
        <Meta follow reply repost />
        <hr />
      </div>
    );
  },
});

module.exports = Person;
