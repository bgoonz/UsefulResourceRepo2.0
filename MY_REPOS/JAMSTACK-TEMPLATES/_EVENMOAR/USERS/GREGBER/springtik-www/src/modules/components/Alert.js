import React, {PropTypes} from 'react';
import styles from './styles/alert.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';

export const Alert = ({
  uiStyle,
  className: propClassName,
  children,
  ...props,
}) => {
  const uiStyleClassName = uiStyle ? styles[`alert-${uiStyle}`] : null;
  const className = classNames(styles.alert, uiStyleClassName, propClassName);

  return (
    <div {...{...props, className}}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  uiStyle: PropTypes.oneOf([
    'info',
    'danger',
    'warning',
  ]),
};

export default withStyles(styles)(Alert);
