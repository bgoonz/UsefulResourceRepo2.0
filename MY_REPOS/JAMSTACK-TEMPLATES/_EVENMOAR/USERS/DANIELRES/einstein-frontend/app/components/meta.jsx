"use strict";

var React = require("react");

var B = require("react-bootstrap");

var Meta = React.createClass({
  displayName: "Meta",

  render: function () {
    return (
      <div>
        <small className="text-muted">
          {2} days
          {this.props.follow && <span> &nbsp; </span>}
          {this.props.follow && (
            <a href="#" title="follow">
              <B.Glyphicon glyph="star-empty" />
            </a>
          )}
          {this.props.reply && <span> &nbsp; </span>}
          {this.props.reply && (
            <a href="#" title="reply">
              <B.Glyphicon glyph="comment" />
            </a>
          )}
          {this.props.repost && <span> &nbsp; </span>}
          {this.props.repost && (
            <a href="#" title="repost">
              <B.Glyphicon glyph="retweet" />
            </a>
          )}
        </small>
      </div>
    );
  },
});

module.exports = Meta;
