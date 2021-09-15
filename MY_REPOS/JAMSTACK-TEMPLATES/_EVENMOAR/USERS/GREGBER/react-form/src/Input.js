import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ControlWrapper from './ControlWrapper';
import ControlMixin from './ControlMixin';
import Formsy from 'formsy-react';

export default React.createClass({
  displayName: 'Input',

  propTypes: {
    autoCorrect: PropTypes.string,
    autoComplete: PropTypes.string,
    autoCapitalize: PropTypes.string,
    autoFocus: PropTypes.bool,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    leftAddon: PropTypes.node,
    rightAddon: PropTypes.node,
    type: PropTypes.string,
  },

  getDefaultProps() {
    return {
      type: 'text',
    };
  },

  mixins: [Formsy.Mixin, ControlMixin, PureRenderMixin],

  /**
   * Called when the value changes.
   *
   * @param {SyntheticEvent} event
   */

  onChange(event) {
    this.changeValue(event.target.value);
  },

  render() {
    const {autoCapitalize, autoCorrect, autoComplete, autoFocus,
      maxLength, placeholder, type, leftAddon, rightAddon} = this.props;
    const {onChange} = this;
    const controlProps = {
      ...this.getControlProps(),
      autoCapitalize, autoCorrect, autoComplete, autoFocus,
      maxLength, placeholder, onChange, type,
    };
    const wrapperProps = {
      ...this.getWrapperProps(),
      hasAddon: Boolean(this.props.leftAddon || this.props.rightAddon),
    };

    return (
      <ControlWrapper {...wrapperProps}>
        {leftAddon
          ? React.cloneElement(leftAddon, {control: this}) : null}
        <input {...controlProps} />
        {rightAddon
          ? React.cloneElement(rightAddon, {control: this}) : null}
      </ControlWrapper>
    );
  },
});
