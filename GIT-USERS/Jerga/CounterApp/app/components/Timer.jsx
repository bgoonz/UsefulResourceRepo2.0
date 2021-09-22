var React = require("react");

var Clock = require("Clock");
var Controls = require("Controls");

var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countdownStatus: "paused",
    };
  },

  componentWillUnmount: function () {
    // called when component disapears
    console.log("Component did unmount");
    clearInterval(this.timer);
    this.timer = undefined;
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countdownStatus != prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case "started":
          this.startTimer();
          break;
        case "stopped":
          this.setState({ count: 0 });
        case "paused":
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },

  startTimer: function () {
    var that = this;

    this.timer = setInterval(function () {
      var newCount = that.state.count + 1;
      that.setState({
        count: newCount,
      });
    }, 1000);
  },

  handleStatusChange: function (newStatus) {
    this.setState({
      countdownStatus: newStatus,
    });
  },

  render: function () {
    var { count, countdownStatus } = this.state;

    return (
      <div>
        <h1 className="page-title"> Timer </h1>
        <Clock totalSeconds={count} />
        <Controls
          onStatusChange={this.handleStatusChange}
          countdownStatus={countdownStatus}
        />
      </div>
    );
  },
});

module.exports = Timer;
