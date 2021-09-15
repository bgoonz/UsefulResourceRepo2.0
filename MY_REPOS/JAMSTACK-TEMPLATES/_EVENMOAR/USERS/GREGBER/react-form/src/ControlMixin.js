import {PropTypes} from 'react';

export default {
  propTypes: {
    className: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    value: PropTypes.string,
    wrapperClassName: PropTypes.string,
  },

  /**
   * Patch formsy to support defaultValue.
   */
  componentWillMount() {
    const value = typeof this.props.defaultValue === 'undefined'
      ? this.props.value
      : this.props.defaultValue;

    this.setState({
      _value: value,
      _pristineValue: value,
    });
  },

  getDefaultProps() {
    return {
      className: 'form-control',
    };
  },

  /**
   * Get an array of options from props.
   *
   * @returns {{value: string, label: string}[]}
   */
  getOptions() {
    const {options} = this.props;

    if (!Array.isArray(options))
      return Object.keys(options)
        .map(key =>
          ({value: String(key), label: options[key]}),
        );

    return options.map(entry =>
      typeof entry === 'string' ? ({value: entry, label: entry}) : entry,
    );
  },

  // from https://github.com/twisty/formsy-react-components/
  hashString(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = (((hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
    }
    return hash;
  },

  // from https://github.com/twisty/formsy-react-components/
  getId() {
    const {
      /* eslint-disable no-unused-vars */
      leftAddon,
      rightAddon,
      /* eslint-enable no-unused-vars */
      ...hashProps,
    } = this.props;
    return this.props.id
      || this.props.name.split('[').join('_').replace(']', '')
        + this.hashString(JSON.stringify(hashProps));
  },

  getControlProps() {
    const {className, name, disabled} = this.props;
    const value = this.getValue();
    return {className, id: this.getId(), name, value, disabled};
  },

  getWrapperProps() {
    const {label, wrapperClassName} = this.props;
    const hasError = !this.isValid() && !this.isPristine();
    return {componentId: this.getId(), className: wrapperClassName, hasError, label};
  },

  changeValue(nextValue) {
    const prevValue = this.getValue();

    if (String(prevValue) === String(nextValue))
      return;

    this.setValue(nextValue);

    if (this.props.onChange)
      this.props.onChange(nextValue);
  },
};
