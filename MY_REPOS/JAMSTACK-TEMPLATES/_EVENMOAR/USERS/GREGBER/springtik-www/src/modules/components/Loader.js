import React, {PropTypes} from 'react';
import Alert from './Alert';

export default class Loader extends React.Component {
  static propTypes = {
    delay: PropTypes.number,
  };

  componentWillMount() {
    this._isMounted = false;

    if (this.props.delay) {
      this.state = {show: false};
      this.timeout = setTimeout(() => this.setState({show: true}), this.props.delay);
    } else {
      this.state = {show: true};
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    if (!this.state.show)
      return null;

    return (
      <Alert uiStyle="info">
        <i className="fa fa-spinner fa-spin" /> Chargement en cours...
      </Alert>
    );
  }
}
