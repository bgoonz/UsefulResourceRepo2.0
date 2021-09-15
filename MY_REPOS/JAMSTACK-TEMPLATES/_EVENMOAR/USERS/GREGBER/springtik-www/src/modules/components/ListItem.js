import React, {PropTypes} from 'react';
import styles from './styles/list.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';

export const ListItem = ({
  className: propClassName,
  children,
  ...props,
}) => {
  const className = classNames(styles.listItem, propClassName);
  return <li {...{className}} {...props}>{children}</li>;
};

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(styles)(ListItem);
