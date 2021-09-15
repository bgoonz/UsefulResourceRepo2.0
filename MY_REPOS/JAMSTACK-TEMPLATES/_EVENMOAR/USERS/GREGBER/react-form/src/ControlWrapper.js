import React, {PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  displayName: 'ControlWrapper',

  propTypes: {
    hasAddon: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    componentId: PropTypes.string,
    hasError: PropTypes.bool.isRequired,
    label: PropTypes.string,
  },

  mixins: [PureRenderMixin],

  render() {
    const {componentId, label, children} = this.props;
    const className = classNames({
      'has-error': this.props.hasError,
    }, this.props.className);

    const control = this.props.hasAddon
      ? <div className="input-group">{children}</div> : children;

    if (label)
      return (
        <div {...{className: classNames(className, 'form-group')}}>
          <Col
            className="control-label"
            componentClass="label"
            htmlFor={componentId}
            sm={3}
          >
            {label}
          </Col>
          <Col sm={9}>
            {control}
          </Col>
        </div>
      );

    return (
      <span {...{className}}>
        {control}
      </span>
    );
  },
});
