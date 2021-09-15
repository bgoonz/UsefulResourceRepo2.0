import React, {PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import styles from './styles/textarea.scss';

export class Textarea extends Component {
  componentWillMount() {
    this.state = {
      charCount: this.getCharCountFromProps(this.props) || 0,
    };
  }

  componentDidMount() {
    if (this.refs.textarea.value)
      this.handleChange({target: this.refs.textarea});
  }

  componentWillReceiveProps(nextProps) {
    const charCount = this.getCharCountFromProps(nextProps);

    if (charCount !== null)
      this.setState({charCount});
  }

  getCharCountFromProps(props) {
    return typeof props.value === 'string'
      ? props.value.length
      : typeof props.defaultValue === 'string'
        ? props.defaultValue.length
        : null;
  }

  handleChange = event => {
    if (this.props.onChange)
      this.props.onChange(event);

    this.setState({charCount: event.target.value.length});
  };

  focus() {
    this.refs.textarea.focus();
  }

  render() {
    const {
      className: propClassName,
      containerClassName: propContainerClassName,
      noControl,
      counter,
      hasError,
      /* eslint-disable no-unused-vars */
      onChange,
      /* eslint-enable no-unused-vars */
      ...props,
    } = this.props;
    const className = classNames({
      [styles.formControl]: !noControl,
    }, propClassName);
    const containerClassName = classNames(styles.controlContainer, {
      [styles.containerError]: hasError,
    }, propContainerClassName);

    return (
      <span className={containerClassName}>
        <textarea
          ref="textarea"
          onChange={this.handleChange}
          {...{...props, className}}
        />
        {counter ? (
          <div className={styles.counter}>
            {this.state.charCount} / {this.props.maxLength}
          </div>
        ) : null}
      </span>
    );
  }
}

Textarea.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  noControl: PropTypes.bool,
  counter: PropTypes.bool,
  hasError: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default withStyles(styles)(Textarea);
