/* eslint react/no-multi-comp: 0 */
import React, {PropTypes} from 'react';
import BaseInput from './Input';
import BaseTextarea from './Textarea';
import BaseSelect from './Select';
import createHelper from 'recompose/createHelper';

export const inForm = createHelper(
  options => {
    options = options || {};

    const {
      extractValueFromOnChange = event => event.target.value,
    } = options;

    return Control => (
      class WrappedControl extends React.Component {
        static propTypes = {
          name: PropTypes.string.isRequired,
          onChange: PropTypes.func,
        };

        static contextTypes = {
          form: PropTypes.object.isRequired,
        };

        componentWillMount() {
          this.context.form.addControl(this);
        }

        componentWillUnmount() {
          this.context.form.removeControl(this);
        }

        handleChange = (...args) => {
          if (this.props.onChange)
            this.props.onChange(...args);

          const value = extractValueFromOnChange.apply(this, args);
          this.context.form.setValue(this.props.name, value);
        }

        handleAutoFillValue = value => {
          this.context.form.setValue(this.props.name, value);
        };

        render() {
          const {
            /* eslint-disable no-unused-vars */
            onChange,
            /* eslint-enable no-unused-vars */
            ...props,
          } = this.props;

          return (
            <Control
              onChange={this.handleChange}
              onAutoFillValue={this.handleAutoFillValue}
              value={this.context.form.getValue(this.props.name)}
              {...props}
            />
          );
        }
      }
    );
  }
, 'inForm');

export const Input = inForm()(BaseInput);
export const Select = inForm({
  extractValueFromOnChange(item) {
    if (this.props.multi)
      return item ? Array.from(new Set(item.toLowerCase().split(','))) : [];

    return item;
  },
})(BaseSelect);
export const Textarea = inForm()(BaseTextarea);

export default class Form extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    onModelChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  static childContextTypes = {
    form: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      form: {
        addControl: this.addControl,
        removeControl: this.removeControl,
        setValue: this.setValue,
        getValue: this.getValue,
      },
    };
  }

  componentDidUpdate() {
    this.controls.forEach(control => {
      control.forceUpdate();
    });
  }

  controls = [];

  addControl = control => {
    this.controls.push(control);
  };

  removeControl = control => {
    const index = this.controls.indexOf(control);

    if (index !== -1)
      this.controls.splice(index, 1);
  };

  setValue = (name, value) => {
    const model = {...this.props.model, [name]: value};
    this.props.onModelChange(model);
  };

  getValue = name => this.props.model[name];

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.props.model, event);
  };

  render() {
    const {
      children,
      /* eslint-disable no-unused-vars */
      model,
      onSubmit,
      /* eslint-enable no-unused-vars */
      ...props,
    } = this.props;

    return (
      <form {...props} onSubmit={this.handleSubmit}>
        {children}
      </form>
    );
  }
}
