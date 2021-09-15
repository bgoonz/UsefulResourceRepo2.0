import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ControlWrapper from './ControlWrapper';
import ControlMixin from './ControlMixin';
import Formsy from 'formsy-react';

export default React.createClass({
  displayName: 'Textarea',

  propTypes: {
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
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
    const {maxLength, rows, placeholder} = this.props;
    const {onChange} = this;

    return (
      <ControlWrapper {...this.getWrapperProps()}>
        <textarea {...this.getControlProps()} {...{maxLength, rows, placeholder, onChange}} />
      </ControlWrapper>
    );
  },
});
