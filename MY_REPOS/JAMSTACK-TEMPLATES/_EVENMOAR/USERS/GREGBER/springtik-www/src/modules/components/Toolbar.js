import React, {PropTypes} from 'react';
import styles from './styles/toolbar.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';

export const Toolbar = ({
  className: propClassName,
  children,
  ...props,
}) => {
  const className = classNames(styles.toolbar, propClassName);

  return (
    <div {...{...props, className}}>
      {children}
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(styles)(Toolbar);
