var React = require("react");
var B = require("react-bootstrap");

var FormErrors = React.createClass({
  displayName: "FormErrorsComponent",

  render: function () {
    var errors = _.map(this.props.errors, function (messages, key) {
      return (
        <div key={key}>
          <strong>{_.capitalize(key)}:</strong>
          <ul>
            {_.map(messages, function (m, i) {
              return <li key={i}>{m}</li>;
            })}
          </ul>
        </div>
      );
    });

    return (
      <div>
        {_.size(this.props.errors) != 0 && (
          <B.Alert bsStyle="warning">{errors}</B.Alert>
        )}
      </div>
    );
  },
});

module.exports.Errors = FormErrors;
