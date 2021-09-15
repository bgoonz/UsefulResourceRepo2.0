var React = require("react");

var CountdownForm = React.createClass({
  onSubmit: function (e) {
    e.preventDefault();
    var strSeconds = this.refs.seconds.value;

    if (strSeconds.match(/^[0-9]*$/)) {
      this.refs.seconds.value = "";
      this.props.onSetCountdown(parseInt(strSeconds, 10));
    }
  },

  render: function () {
    return (
      <div>
        <form ref="form" onSubmit={this.onSubmit} className="countdown-form">
          <input
            type="text"
            ref="seconds"
            placeholder="Enter Time in Seconds"
          />
          <button className="button expanded"> Start </button>
        </form>
      </div>
    );
  },
});

module.exports = CountdownForm;
