var React = require("react");

var Controls = React.createClass({
  propTypes: {
    countdownStatus: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func.isRequired,
  },

  onStatusChange: function (newStatus) {
    return () => {
      this.props.onStatusChange(newStatus);
    };
  },

  // componentWillReceiveProps: function(newProps){
  //     console.log("Component will recieve new props");
  // },

  render: function () {
    var { countdownStatus } = this.props;
    var renderStartStopButton = () => {
      if (countdownStatus === "started") {
        return (
          <button
            className="button secondary"
            onClick={this.onStatusChange("paused")}
          >
            {" "}
            Pause{" "}
          </button>
        );
      } else if (
        countdownStatus === "paused" ||
        countdownStatus === "stopped"
      ) {
        return (
          <button
            className="button primary"
            onClick={this.onStatusChange("started")}
          >
            {" "}
            Start{" "}
          </button>
        );
      }
    };

    return (
      <div className="controls">
        {renderStartStopButton()}
        <button
          className="button alert hollow"
          onClick={this.onStatusChange("stopped")}
        >
          {" "}
          Clear{" "}
        </button>
      </div>
    );
  },
});

module.exports = Controls;
