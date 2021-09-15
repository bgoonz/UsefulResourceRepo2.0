import React, {PropTypes} from 'react';
import styles from './styles/button.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Button = ({
  className: propClassName,
  children,
  block,
  large,
  small,
  uiStyle,
  ...props,
}) => {
  const uiStyleClassName = uiStyle ? `btn-${uiStyle}` : null;
  const className = cx('btn', {
    'btn-block': block,
    'btn-large': large,
    'btn-small': small,
  }, uiStyleClassName, propClassName);
  return <button {...{className}} {...props}>{children}</button>;
};

Button.propTypes = {
  block: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  uiStyle: PropTypes.oneOf(['danger']),
};

export default withStyles(styles)(Button);
