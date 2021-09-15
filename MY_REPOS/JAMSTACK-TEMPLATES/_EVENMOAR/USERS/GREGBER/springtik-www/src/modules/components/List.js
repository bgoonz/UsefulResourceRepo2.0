import React, {PropTypes} from 'react';
import styles from './styles/list.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';

export const List = ({
  className: propClassName,
  children,
  ...props,
}) => {
  const className = classNames(styles.list, propClassName);
  return (
    <ul {...{className}} {...props}>
      {children}
    </ul>
  );
};

List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(styles)(List);
