import PropTypes from "prop-types";
import React from "react";

class TypistLoop extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    interval: PropTypes.number,
  };

  static defaultProps = {
    interval: 1000,
  };

  state = {
    currentIndex: 0,
  };

  componentDidMount() {
    this.timeouts = [];
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this._timer) {
      clearTimeout(this._timer);
      // this.timeouts.forEach(clearTimeout);
    }
  }

  onTypingDone = () => {
    console.log("typing done");
    // this.timeouts.push(setTimeout(this.showNext, this.props.interval))
    this._timer = setTimeout(this.showNext, this.props.interval);
  };

  showNext = () => {
    if (!this._isMounted) {
      return;
    }
    const { children } = this.props;
    this.setState(({ currentIndex }) => ({
      currentIndex: (currentIndex + 1) % React.Children.count(children),
    }));
  };

  render() {
    const { onTypingDone } = this;
    const { currentIndex } = this.state;
    const { children } = this.props;
    return React.Children.map(
      children,
      (child, i) =>
        i === currentIndex && React.cloneElement(child, { onTypingDone })
    );
  }
}

export default TypistLoop;
